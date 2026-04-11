# Firebase Content And Asset Sync

This folder provides a one-step sync from local project content to Firebase.

It syncs:
- Text/content datasets from src/data into Firestore
- Image assets from public/images into Firebase Storage
- Asset manifest records into Firestore

## Prerequisites

1. Firebase project with Firestore and Storage enabled
2. Service account JSON with Firestore and Storage access

## Environment Variables

Set these in your shell before running.

Required:
- FIREBASE_SERVICE_ACCOUNT_PATH: path to service account JSON file

Alternative:
- FIREBASE_SERVICE_ACCOUNT_JSON: raw JSON string of service account
- GOOGLE_APPLICATION_CREDENTIALS: path to service account JSON

Recommended:
- FIREBASE_PROJECT_ID: your firebase project id
- FIREBASE_STORAGE_BUCKET: your storage bucket, for example my-project.appspot.com

Optional:
- FIREBASE_ASSET_PREFIX: destination folder in bucket (default: site-assets/images)

## Commands

Run full sync (text + assets):
- npm run firebase:sync

Run only text/content datasets:
- npm run firebase:sync:text

Show usage:
- node scripts/firebase/sync-content.mjs --help

## Firestore Structure Written

Collection: content
- content/about (object doc)
- content/siteConfig (object doc)
- content/sections (object doc)
- content/events (metadata doc)
  - content/events/records/{recordId}
- content/notices (metadata doc)
  - content/notices/records/{recordId}
- content/resources (metadata doc)
  - content/resources/records/{recordId}
- content/projects (metadata doc)
  - content/projects/records/{recordId}
- content/faculty (metadata doc)
  - content/faculty/records/{recordId}
- content/mockTests (metadata doc)
  - content/mockTests/records/{recordId}

Collection: assets
- assets/images (metadata doc)
  - assets/images/files/{docId}

## Notes

- Record ids in Firestore are generated from source item ids to remain stable.
- Stale Firestore records that no longer exist locally are removed from records subcollections.
- Asset uploads overwrite existing files at the same storage path.
- Stale file manifest docs are removed, but remote storage objects are not deleted by this script.
