import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const CONTENT_TARGET = 'content';
const ASSET_TARGET = 'assets';
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']);
const CONTENT_MAP = [
  { key: 'about', modulePath: 'src/data/about.js', exportName: 'ABOUT' },
  { key: 'events', modulePath: 'src/data/events.js', exportName: 'EVENTS' },
  { key: 'faculty', modulePath: 'src/data/faculty.js', exportName: 'FACULTY' },
  { key: 'mockTests', modulePath: 'src/data/mock-tests.js', exportName: 'MOCK_TESTS' },
  { key: 'notices', modulePath: 'src/data/notices.js', exportName: 'NOTICES' },
  { key: 'projects', modulePath: 'src/data/projects.js', exportName: 'PROJECTS' },
  { key: 'resources', modulePath: 'src/data/resources.js', exportName: 'RESOURCES' },
  { key: 'siteConfig', modulePath: 'src/data/site-config.js', exportName: 'SITE_CONFIG' },
  { key: 'sections', modulePath: 'src/data/site-config.js', exportName: 'SECTIONS' },
];

function printUsage() {
  console.log('Firebase content sync');
  console.log('');
  console.log('Required env:');
  console.log('- FIREBASE_SERVICE_ACCOUNT_PATH (path to service-account JSON)');
  console.log('  or FIREBASE_SERVICE_ACCOUNT_JSON (raw JSON string)');
  console.log('- FIREBASE_STORAGE_BUCKET (required for asset upload)');
  console.log('');
  console.log('Optional env:');
  console.log('- FIREBASE_PROJECT_ID');
  console.log('- FIREBASE_ASSET_PREFIX (default: site-assets/images)');
  console.log('');
  console.log('Usage:');
  console.log('  npm run firebase:sync');
}

function parseCliArgs() {
  const flags = new Set(process.argv.slice(2));
  return {
    help: flags.has('--help') || flags.has('-h'),
    textOnly: flags.has('--text-only'),
  };
}

function normalizePrivateKey(privateKey) {
  if (typeof privateKey !== 'string') return privateKey;
  return privateKey.includes('\\n') ? privateKey.replace(/\\n/g, '\n') : privateKey;
}

async function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    if (parsed.private_key) parsed.private_key = normalizePrivateKey(parsed.private_key);
    return parsed;
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    const absolutePath = path.isAbsolute(serviceAccountPath)
      ? serviceAccountPath
      : path.resolve(repoRoot, serviceAccountPath);

    if (!existsSync(absolutePath)) {
      throw new Error(`Service account file not found: ${absolutePath}`);
    }

    const content = await fs.readFile(absolutePath, 'utf8');
    const parsed = JSON.parse(content);
    if (parsed.private_key) parsed.private_key = normalizePrivateKey(parsed.private_key);
    return parsed;
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return null;
  }

  throw new Error(
    'Missing credentials. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.',
  );
}

function toDocId(value, fallbackValue = '') {
  const source = `${value || ''}`.trim();
  if (!source) {
    const stableFallback = `${fallbackValue || 'item'}`.trim();
    return Buffer.from(stableFallback).toString('base64url');
  }
  return Buffer.from(source).toString('base64url');
}

function inferContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
  };
  return map[ext] || 'application/octet-stream';
}

async function walkFiles(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const collected = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkFiles(fullPath);
      collected.push(...nested);
      continue;
    }
    collected.push(fullPath);
  }

  return collected;
}

async function loadDataset(definition) {
  const absPath = path.resolve(repoRoot, definition.modulePath);
  const moduleUrl = pathToFileURL(absPath).href;
  const imported = await import(moduleUrl);

  if (!(definition.exportName in imported)) {
    throw new Error(`Export ${definition.exportName} not found in ${definition.modulePath}`);
  }

  const payload = imported[definition.exportName];
  return {
    ...definition,
    payload,
  };
}

async function syncArrayDataset(db, dataset) {
  const rootDocRef = db.collection(CONTENT_TARGET).doc(dataset.key);
  const recordsRef = rootDocRef.collection('records');

  const items = dataset.payload.map((item, index) => {
    const defaultId = `${dataset.key}-${index + 1}`;
    const recordId = toDocId(item?.id || item?.slug || defaultId, dataset.key);
    return {
      recordId,
      item,
    };
  });

  const itemIds = new Set(items.map((entry) => entry.recordId));
  const existingSnapshot = await recordsRef.get();

  const staleIds = [];
  for (const docSnap of existingSnapshot.docs) {
    if (!itemIds.has(docSnap.id)) staleIds.push(docSnap.id);
  }

  await rootDocRef.set(
    {
      dataset: dataset.key,
      exportName: dataset.exportName,
      modulePath: dataset.modulePath,
      shape: 'array',
      count: items.length,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  let batch = db.batch();
  let batchOps = 0;
  const commitBatch = async () => {
    if (batchOps === 0) return;
    await batch.commit();
    batch = db.batch();
    batchOps = 0;
  };

  for (const { recordId, item } of items) {
    batch.set(recordsRef.doc(recordId), {
      ...item,
      _recordId: recordId,
      _dataset: dataset.key,
      _syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    batchOps += 1;

    if (batchOps >= 400) {
      await commitBatch();
    }
  }

  for (const staleId of staleIds) {
    batch.delete(recordsRef.doc(staleId));
    batchOps += 1;

    if (batchOps >= 400) {
      await commitBatch();
    }
  }

  await commitBatch();

  return {
    dataset: dataset.key,
    count: items.length,
    staleDeleted: staleIds.length,
  };
}

async function syncObjectDataset(db, dataset) {
  const docRef = db.collection(CONTENT_TARGET).doc(dataset.key);
  await docRef.set(
    {
      dataset: dataset.key,
      exportName: dataset.exportName,
      modulePath: dataset.modulePath,
      shape: 'object',
      payload: dataset.payload,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return {
    dataset: dataset.key,
    count: 1,
    staleDeleted: 0,
  };
}

async function syncTextContent(db) {
  const loaded = [];
  for (const definition of CONTENT_MAP) {
    loaded.push(await loadDataset(definition));
  }

  const summary = [];
  for (const dataset of loaded) {
    if (Array.isArray(dataset.payload)) {
      summary.push(await syncArrayDataset(db, dataset));
      continue;
    }

    if (dataset.payload && typeof dataset.payload === 'object') {
      summary.push(await syncObjectDataset(db, dataset));
      continue;
    }

    throw new Error(
      `Unsupported dataset payload for ${dataset.key}. Expected array/object but got ${typeof dataset.payload}.`,
    );
  }

  return summary;
}

async function syncImageAssets(db, bucket) {
  const imageRoot = path.resolve(repoRoot, 'public', 'images');

  if (!existsSync(imageRoot)) {
    return {
      uploaded: 0,
      staleManifestDeleted: 0,
      skipped: 0,
      message: 'public/images not found; skipped asset sync.',
    };
  }

  const allFiles = await walkFiles(imageRoot);
  const imageFiles = allFiles.filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()));

  const assetPrefix = process.env.FIREBASE_ASSET_PREFIX || 'site-assets/images';
  const assetDocRef = db.collection(ASSET_TARGET).doc('images');
  const filesRef = assetDocRef.collection('files');

  const existingSnapshot = await filesRef.get();
  const expectedDocIds = new Set();

  let uploaded = 0;
  let skipped = 0;
  let batch = db.batch();
  let batchOps = 0;

  const commitBatch = async () => {
    if (batchOps === 0) return;
    await batch.commit();
    batch = db.batch();
    batchOps = 0;
  };

  for (const filePath of imageFiles) {
    const relativePath = path.relative(imageRoot, filePath).replace(/\\/g, '/');
    const destination = `${assetPrefix}/${relativePath}`;
    const contentType = inferContentType(filePath);

    await bucket.upload(filePath, {
      destination,
      metadata: {
        contentType,
        cacheControl: 'public,max-age=31536000,immutable',
      },
    });

    const docId = toDocId(relativePath, relativePath);
    expectedDocIds.add(docId);

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;

    batch.set(filesRef.doc(docId), {
      docId,
      relativePath,
      storagePath: destination,
      publicUrl,
      contentType,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    batchOps += 1;
    uploaded += 1;

    if (batchOps >= 300) {
      await commitBatch();
    }
  }

  for (const staleDoc of existingSnapshot.docs) {
    if (expectedDocIds.has(staleDoc.id)) {
      skipped += 1;
      continue;
    }
    batch.delete(filesRef.doc(staleDoc.id));
    batchOps += 1;
    if (batchOps >= 300) {
      await commitBatch();
    }
  }

  await commitBatch();

  await assetDocRef.set(
    {
      count: imageFiles.length,
      syncedAt: admin.firestore.FieldValue.serverTimestamp(),
      storageBucket: bucket.name,
      assetPrefix,
    },
    { merge: true },
  );

  const staleManifestDeleted = Math.max(existingSnapshot.size - skipped, 0);
  return {
    uploaded,
    staleManifestDeleted,
    skipped,
    message: `Synced ${uploaded} image assets.`,
  };
}

async function main() {
  const args = parseCliArgs();
  if (args.help) {
    printUsage();
    return;
  }

  const serviceAccount = await loadServiceAccount();
  const projectId = process.env.FIREBASE_PROJECT_ID || serviceAccount?.project_id;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || serviceAccount?.storage_bucket;

  if (!projectId) {
    throw new Error('Missing Firebase project id. Set FIREBASE_PROJECT_ID or include project_id in service account JSON.');
  }

  const appConfig = {
    projectId,
  };

  if (storageBucket) {
    appConfig.storageBucket = storageBucket;
  }

  if (serviceAccount) {
    appConfig.credential = admin.credential.cert(serviceAccount);
  } else {
    appConfig.credential = admin.credential.applicationDefault();
  }

  admin.initializeApp(appConfig);

  const db = admin.firestore();
  const textSummary = await syncTextContent(db);

  console.log('Text content sync completed:');
  for (const item of textSummary) {
    console.log(`- ${item.dataset}: ${item.count} records synced (stale removed: ${item.staleDeleted})`);
  }

  if (args.textOnly) {
    console.log('Skipped asset sync because --text-only flag was provided.');
    return;
  }

  if (!storageBucket) {
    console.log('Skipped asset sync: FIREBASE_STORAGE_BUCKET is not set.');
    return;
  }

  const bucket = admin.storage().bucket(storageBucket);
  const assetSummary = await syncImageAssets(db, bucket);

  console.log(assetSummary.message);
  console.log(`- stale manifest removed: ${assetSummary.staleManifestDeleted}`);
}

main().catch((error) => {
  console.error('Firebase sync failed.');
  console.error(error);
  process.exit(1);
});
