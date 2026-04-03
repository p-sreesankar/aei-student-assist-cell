import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, hasFirebaseConfig } from '@lib/firebase';
import { NOTICES as defaultNotices } from '@data/notices';
import { EVENTS as defaultEvents } from '@data/events';
import { FACULTY as defaultContacts } from '@data/faculty';
import { MOCK_TESTS as defaultMockTests } from '@data/mock-tests';
import { isAdminAuthenticated } from '@utils/adminAuth';

const COLLECTION = 'content';
const LS_KEYS = {
  notices: 'aei:content:notices',
  events: 'aei:content:events',
  contacts: 'aei:content:contacts',
  mockTests: 'aei:content:mock-tests',
};

function clone(items) {
  return JSON.parse(JSON.stringify(items));
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
  localStorage.setItem(LS_KEYS[domain], JSON.stringify(items));
}

async function readDomain(domain, fallback) {
  if (!hasFirebaseConfig || !db) {
    return readLocal(domain, fallback);
  }

  try {
    const ref = doc(db, COLLECTION, domain);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const seeded = readLocal(domain, fallback);
      await setDoc(ref, { items: seeded, updatedAt: Date.now() }, { merge: true });
      return seeded;
    }

    const data = snap.data();
    const items = Array.isArray(data?.items) ? data.items : readLocal(domain, fallback);
    writeLocal(domain, items);
    return items;
  } catch {
    return readLocal(domain, fallback);
  }
}

async function writeDomain(domain, items) {
  if (!isAdminAuthenticated()) {
    throw new Error('Admin session required for write operation.');
  }

  if (hasFirebaseConfig && auth) {
    if (!auth.currentUser) {
      throw new Error('Firebase admin authentication required.');
    }

    const tokenResult = await auth.currentUser.getIdTokenResult(true);
    if (!tokenResult?.claims?.admin) {
      throw new Error('Firebase admin claim required for write operation.');
    }
  }

  const cleanItems = Array.isArray(items) ? items : [];
  writeLocal(domain, cleanItems);

  if (!hasFirebaseConfig || !db) return cleanItems;

  const ref = doc(db, COLLECTION, domain);
  await setDoc(ref, { items: cleanItems, updatedAt: Date.now() }, { merge: true });
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
