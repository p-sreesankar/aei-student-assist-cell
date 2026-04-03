import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'node:fs';
import path from 'node:path';

const uid = process.argv[2];
const keyPathInput = process.argv[3];

if (!uid || !keyPathInput) {
  console.error('Usage: node scripts/set-admin-claim.mjs <UID> <service-account.json>');
  process.exit(1);
}

const keyPath = path.resolve(keyPathInput);
if (!fs.existsSync(keyPath)) {
  console.error(`Service account file not found: ${keyPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
initializeApp({ credential: cert(serviceAccount) });

await getAuth().setCustomUserClaims(uid, { admin: true });
await getAuth().revokeRefreshTokens(uid);

console.log(`Admin claim set successfully for UID: ${uid}`);
console.log('Next step: sign out and sign in again to refresh the token.');
