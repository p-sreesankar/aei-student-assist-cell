# Firebase Security Setup

This project now has two layers of write protection for content CRUD:

1. Client guard: repository writes require an active admin session.
2. Firestore rules: database writes require Firebase Auth + admin custom claim.

## 1) Deploy Firestore Rules

Prerequisites:
- Firebase project already created
- Firebase CLI installed: `npm i -g firebase-tools`
- Logged in: `firebase login`

Commands:

```bash
firebase use <your-project-id>
firebase deploy --only firestore:rules
```

This deploys rules from [firestore.rules](firestore.rules).

## 2) Enable Authentication in Firebase Console

In Firebase Console:
- Open Authentication
- Enable at least one sign-in provider for admin users (Email/Password recommended)

## 3) Grant Admin Claim (Required for Writes)

Firestore writes are allowed only when `request.auth.token.admin == true`.
Set this claim from a trusted backend using Firebase Admin SDK.

Example (Node.js admin script):

```js
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './service-account.json' assert { type: 'json' };

initializeApp({ credential: cert(serviceAccount) });

const uid = 'TARGET_USER_UID';
await getAuth().setCustomUserClaims(uid, { admin: true });
console.log('Admin claim set');
```

## 4) Current Admin Login Flow

Admin login now requires both:

1. Admin PIN (client session guard)
2. Firebase Auth email/password sign-in

When Firebase is configured, repository writes also require a valid Firebase user token with `admin: true` custom claim.

This keeps UI protection, client-side write checks, and Firestore rules aligned.
