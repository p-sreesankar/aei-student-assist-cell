import { signOut } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '@lib/firebase';

const ADMIN_BACKDOOR_PATH = '/portal-2741';
const ADMIN_SESSION_KEY = 'aei:admin:session';
const ADMIN_FAILED_ATTEMPTS_KEY = 'aei:admin:attempts';
const ADMIN_LOCK_UNTIL_KEY = 'aei:admin:lock-until';
const ADMIN_PIN_HASH = '6dba77308243555a9aa265b68f884ed5e51a46beb48d07fdf5fdba47f20e728a'; // SHA-256 for PIN 2741

const MAX_ATTEMPTS = 5;
const LOCK_TIME_MS = 5 * 60 * 1000;
const SESSION_TIME_MS = 8 * 60 * 60 * 1000;

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function getAdminLockState() {
  const lockUntil = Number(localStorage.getItem(ADMIN_LOCK_UNTIL_KEY) || 0);
  const now = Date.now();
  const locked = lockUntil > now;
  return {
    locked,
    lockUntil,
    remainingMs: locked ? lockUntil - now : 0,
  };
}

export async function verifyAdminPin(pin) {
  const { locked } = getAdminLockState();
  if (locked) return { ok: false, reason: 'locked' };

  const hash = await sha256(pin || '');
  if (hash === ADMIN_PIN_HASH) {
    localStorage.removeItem(ADMIN_FAILED_ATTEMPTS_KEY);
    localStorage.removeItem(ADMIN_LOCK_UNTIL_KEY);
    localStorage.setItem(
      ADMIN_SESSION_KEY,
      JSON.stringify({
        authenticatedAt: Date.now(),
        expiresAt: Date.now() + SESSION_TIME_MS,
      }),
    );
    return { ok: true };
  }

  const attempts = Number(localStorage.getItem(ADMIN_FAILED_ATTEMPTS_KEY) || 0) + 1;
  localStorage.setItem(ADMIN_FAILED_ATTEMPTS_KEY, String(attempts));

  if (attempts >= MAX_ATTEMPTS) {
    const lockUntil = Date.now() + LOCK_TIME_MS;
    localStorage.setItem(ADMIN_LOCK_UNTIL_KEY, String(lockUntil));
    localStorage.setItem(ADMIN_FAILED_ATTEMPTS_KEY, '0');
    return { ok: false, reason: 'locked' };
  }

  return { ok: false, reason: 'invalid', attemptsLeft: MAX_ATTEMPTS - attempts };
}

export function isAdminAuthenticated() {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return false;
  try {
    const session = JSON.parse(raw);
    if (!session?.expiresAt || session.expiresAt < Date.now()) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }

    if (hasFirebaseConfig && auth && !auth.currentUser) {
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return false;
  }
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  if (auth?.currentUser) {
    signOut(auth).catch(() => {});
  }
}

export { ADMIN_BACKDOOR_PATH };
