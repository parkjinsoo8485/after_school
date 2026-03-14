# Firestore Seeding

This project includes two ways to seed public demo content into Firestore:

1. Internal API route: `POST /api/admin/seed-public-content`
2. Local CLI: `seed_data.js`

Both paths are idempotent by title. If a course or notice with the same `title` already exists, the record is skipped.

## Required Environment Variables

Create `.env.local` from `.env.example` and set:

```bash
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
SEED_API_SECRET=
```

`FIREBASE_ADMIN_PRIVATE_KEY` must be stored with escaped newlines (`\n`) when placed in `.env.local`.

## Preflight Checklist

Before any write:

1. Confirm you are targeting the correct Firebase project.
2. Confirm the service account has Firestore write access.
3. Confirm `FIREBASE_ADMIN_PRIVATE_KEY` is copied completely, including header/footer lines.
4. Confirm `SEED_API_SECRET` is set to a non-trivial random value.
5. Run a dry run first and inspect the returned `added` / `skipped` results.
6. If production data already exists, verify duplicate detection by `title` is sufficient for your dataset.

## API Flow

Dry run:

```bash
curl -X POST http://localhost:3000/api/admin/seed-public-content \
  -H "Content-Type: application/json" \
  -H "x-seed-secret: your-secret" \
  -d "{\"dryRun\":true}"
```

Write:

```bash
curl -X POST http://localhost:3000/api/admin/seed-public-content \
  -H "Content-Type: application/json" \
  -H "x-seed-secret: your-secret" \
  -d "{\"dryRun\":false}"
```

## CLI Flow

The CLI auto-loads `.env.local` and `.env` using `@next/env`.

Dry run:

```bash
npm run seed
```

Write:

```bash
npm run seed:write
```

The write command requires an explicit confirmation flag internally to reduce accidental execution.

## Verification

After a successful write, verify these routes against real Firestore data:

- `/`
- `/courses`
- `/courses/detail`
- `/notices`
- `/mypage`
