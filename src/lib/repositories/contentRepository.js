import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, hasFirebaseConfig } from '@lib/firebase';
import { NOTICES as defaultNotices } from '@data/notices';
import { EVENTS as defaultEvents } from '@data/events';
import { FACULTY as defaultContacts } from '@data/faculty';
import { MOCK_TESTS as defaultMockTests } from '@data/mock-tests';
import { RESOURCES as legacyDefaultResources, schemes } from '@data/resources';
import { isAdminAuthenticated } from '@utils/adminAuth';

const COLLECTION = 'content';
export const CONTENT_UPDATED_EVENT = 'aei:content:updated';
const LS_KEYS = {
  notices: 'aei:content:notices',
  events: 'aei:content:events',
  contacts: 'aei:content:contacts',
  mockTests: 'aei:content:mock-tests',
  resources: 'aei:content:resources',
};

const LS_KEY_TO_DOMAIN = Object.entries(LS_KEYS).reduce((acc, [domain, key]) => {
  acc[key] = domain;
  return acc;
}, {});

function clone(items) {
  return JSON.parse(JSON.stringify(items));
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferFileType(resourceType, link) {
  if (resourceType === 'video') return 'video';
  if (/youtube\.com|youtu\.be/i.test(String(link || ''))) return 'video';
  if (resourceType === 'formula') return 'formula';
  if (resourceType === 'answer-key') return 'answer-key';
  if (resourceType === 'qn-paper' || resourceType === 'qn-papers' || resourceType === 'question-paper') {
    return 'question-paper';
  }
  return 'pdf';
}

function buildResourcesFromSchemes() {
  const items = [];

  schemes.forEach((scheme) => {
    const schemeId = String(scheme?.id || '').trim();
    const schemeLabel = String(scheme?.label || '').trim() || `${schemeId} Scheme`;
    const semesters = Array.isArray(scheme?.semesters) ? scheme.semesters : [];

    semesters.forEach((semesterBlock) => {
      const semester = Number(semesterBlock?.semester);
      const semesterLabel = Number.isFinite(semester) ? `S${semester}` : 'General';
      const subjects = Array.isArray(semesterBlock?.subjects) ? semesterBlock.subjects : [];

      subjects.forEach((subject) => {
        const subjectId = String(subject?.id || '').trim();
        const subjectName = String(subject?.name || '').trim();
        const subjectCode = String(subject?.code || '').trim();
        const resources = Array.isArray(subject?.resources) ? subject.resources : [];

        resources.forEach((resource, index) => {
          const link = String(resource?.driveLink || resource?.youtubeLink || '').trim();
          if (!link) return;

          const resourceType = String(resource?.type || '').trim().toLowerCase();
          const title = String(resource?.title || '').trim() || 'Resource';
          const normalizedSubject = slugify(subjectName || subjectId || `subject-${index + 1}`);
          const normalizedType = slugify(resourceType || 'resource');
          const normalizedTitle = slugify(title) || `item-${index + 1}`;

          items.push({
            id: `site-${schemeId}-${semesterLabel.toLowerCase()}-${normalizedSubject}-${normalizedType}-${normalizedTitle}`,
            title,
            description: `${subjectName}${subjectCode ? ` (${subjectCode})` : ''}`,
            category: `${schemeLabel} ${semesterLabel}`,
            fileType: inferFileType(resourceType, link),
            driveLink: link,
            addedDate: '2026-04-08',
          });
        });
      });
    });
  });

  return items;
}

function dedupeResources(items) {
  const seen = new Set();
  const deduped = [];

  items.forEach((item) => {
    const id = String(item?.id || '').trim();
    const title = String(item?.title || '').trim();
    const link = String(item?.driveLink || '').trim();
    if (!link) return;

    const key = id || `${title}::${link}`;
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(item);
  });

  return deduped;
}

const websiteResources = buildResourcesFromSchemes();
const defaultResources = dedupeResources([...websiteResources, ...legacyDefaultResources]);

function mergeWithSeedResources(items) {
  return dedupeResources([...(Array.isArray(items) ? items : []), ...websiteResources]);
}

function readLocal(domain, fallback) {
  const key = LS_KEYS[domain];
  const raw = localStorage.getItem(key);
  if (!raw) return clone(fallback);

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function writeLocal(domain, items) {
  const key = LS_KEYS[domain];
  const serialized = JSON.stringify(items);
  const previous = localStorage.getItem(key);
  if (previous === serialized) return;

  localStorage.setItem(key, serialized);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT, { detail: { domain } }));
  }
}

export function subscribeContentUpdates(onUpdate, domains = []) {
  if (typeof window === 'undefined' || typeof onUpdate !== 'function') {
    return () => {};
  }

  const domainSet = new Set(domains);
  const isTracked = (domain) => domainSet.size === 0 || domainSet.has(domain);

  const onCustomUpdate = (event) => {
    const domain = event?.detail?.domain;
    if (!domain || isTracked(domain)) {
      onUpdate(domain || null);
    }
  };

  const onStorageUpdate = (event) => {
    const domain = LS_KEY_TO_DOMAIN[event.key];
    if (domain && isTracked(domain)) {
      onUpdate(domain);
    }
  };

  window.addEventListener(CONTENT_UPDATED_EVENT, onCustomUpdate);
  window.addEventListener('storage', onStorageUpdate);

  return () => {
    window.removeEventListener(CONTENT_UPDATED_EVENT, onCustomUpdate);
    window.removeEventListener('storage', onStorageUpdate);
  };
}

async function hasFirebaseAdminSession() {
  if (!hasFirebaseConfig || !auth?.currentUser) return false;

  try {
    const tokenResult = await auth.currentUser.getIdTokenResult();
    return Boolean(tokenResult?.claims?.admin);
  } catch {
    return false;
  }
}

async function readDomain(domain, fallback) {
  if (!hasFirebaseConfig || !db) {
    const localItems = readLocal(domain, fallback);
    if (domain !== 'resources') {
      return localItems;
    }

    const mergedLocal = mergeWithSeedResources(localItems);
    if (mergedLocal.length !== localItems.length) {
      writeLocal(domain, mergedLocal);
    }

    return mergedLocal;
  }

  const localItems = domain === 'resources'
    ? mergeWithSeedResources(readLocal(domain, fallback))
    : readLocal(domain, fallback);
  const canUseCloud = await hasFirebaseAdminSession();
  if (!canUseCloud) {
    if (domain === 'resources') {
      writeLocal(domain, localItems);
    }
    return localItems;
  }

  try {
    const ref = doc(db, COLLECTION, domain);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const seeded = localItems;
      await setDoc(ref, { items: seeded, updatedAt: Date.now() }, { merge: true });
      return seeded;
    }

    const data = snap.data();
    const items = Array.isArray(data?.items) ? data.items : localItems;
    if (domain !== 'resources') {
      writeLocal(domain, items);
      return items;
    }

    const mergedItems = mergeWithSeedResources(items);
    writeLocal(domain, mergedItems);
    if (mergedItems.length !== items.length) {
      await setDoc(ref, { items: mergedItems, updatedAt: Date.now() }, { merge: true });
    }
    return mergedItems;
  } catch {
    return localItems;
  }
}

async function writeDomain(domain, items) {
  if (!isAdminAuthenticated()) {
    throw new Error('Admin session required for write operation.');
  }

  const cleanItems = Array.isArray(items) ? items : [];
  writeLocal(domain, cleanItems);

  if (!hasFirebaseConfig || !db) return cleanItems;

  // In PIN-only mode, keep local writes as source of truth unless a Firebase admin session exists.
  const canUseCloud = await hasFirebaseAdminSession();
  if (!canUseCloud) return cleanItems;

  try {
    const ref = doc(db, COLLECTION, domain);
    await setDoc(ref, { items: cleanItems, updatedAt: Date.now() }, { merge: true });
  } catch {
    // Keep local data as source of truth when cloud write fails.
  }

  return cleanItems;
}

export async function getNotices() {
  const items = await readDomain('notices', defaultNotices);
  return items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function upsertNotice(notice) {
  const current = await getNotices();
  const existingIndex = current.findIndex((n) => n.id === notice.id);

  if (existingIndex === -1) {
    current.unshift(notice);
  } else {
    current[existingIndex] = notice;
  }

  return writeDomain('notices', current);
}

export async function deleteNotice(noticeId) {
  const current = await getNotices();
  const next = current.filter((n) => n.id !== noticeId);
  return writeDomain('notices', next);
}

export async function getEvents() {
  const items = await readDomain('events', defaultEvents);
  return items.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export async function upsertEvent(event) {
  const current = await getEvents();
  const existingIndex = current.findIndex((e) => e.id === event.id);

  if (existingIndex === -1) {
    current.push(event);
  } else {
    current[existingIndex] = event;
  }

  return writeDomain('events', current);
}

export async function deleteEvent(eventId) {
  const current = await getEvents();
  const next = current.filter((e) => e.id !== eventId);
  return writeDomain('events', next);
}

export async function getContacts() {
  const items = await readDomain('contacts', defaultContacts);
  return items;
}

export async function upsertContact(contact) {
  const current = await getContacts();
  const existingIndex = current.findIndex((c) => c.id === contact.id);

  if (existingIndex === -1) {
    current.push(contact);
  } else {
    current[existingIndex] = contact;
  }

  return writeDomain('contacts', current);
}

export async function deleteContact(contactId) {
  const current = await getContacts();
  const next = current.filter((c) => c.id !== contactId);
  return writeDomain('contacts', next);
}

export async function getResources() {
  const items = await readDomain('resources', defaultResources);
  return items.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
}

export async function upsertResource(resource) {
  const current = await getResources();
  const existingIndex = current.findIndex((r) => r.id === resource.id);

  if (existingIndex === -1) {
    current.unshift(resource);
  } else {
    current[existingIndex] = resource;
  }

  return writeDomain('resources', current);
}

export async function deleteResource(resourceId) {
  const current = await getResources();
  const next = current.filter((r) => r.id !== resourceId);
  return writeDomain('resources', next);
}

export async function getMockTests() {
  const items = await readDomain('mockTests', defaultMockTests);
  return items.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

export async function getMockTestById(testId) {
  const tests = await getMockTests();
  return tests.find((t) => t.id === testId) || null;
}

export async function upsertMockTest(mockTest) {
  const current = await getMockTests();
  const existingIndex = current.findIndex((t) => t.id === mockTest.id);

  if (existingIndex === -1) {
    current.push(mockTest);
  } else {
    current[existingIndex] = mockTest;
  }

  return writeDomain('mockTests', current);
}

export async function deleteMockTest(testId) {
  const current = await getMockTests();
  const next = current.filter((t) => t.id !== testId);
  return writeDomain('mockTests', next);
}
