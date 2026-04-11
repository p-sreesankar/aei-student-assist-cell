import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCaH79BG80ll6vuHuoLpa8DP6yECmdQZSM',
  authDomain: 'aei-association.firebaseapp.com',
  projectId: 'aei-association',
  storageBucket: 'aei-association.firebasestorage.app',
  messagingSenderId: '120269872533',
  appId: '1:120269872533:web:108b7933daf473e6d82a9c',
  measurementId: 'G-K97BBNSM95',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let analyticsInstance = null;

async function initAnalytics() {
  if (typeof window === 'undefined') return null;
  if (!firebaseConfig.measurementId) return null;
  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (!supported) return null;

  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}

export { app, db, firebaseConfig, initAnalytics, storage };