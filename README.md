# After School

## Run

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` first if you plan to use the admin seed flow:

```bash
Copy-Item .env.example .env.local
```

## Build

```bash
npm run build
npm start
```

## Firestore Seed

Detailed runbook: `docs/firestore-seeding.md`

### Firebase Admin Seed API

Internal seed route:

```bash
POST /api/admin/seed-public-content
```

Required environment variables:

```bash
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
SEED_API_SECRET=
```

Request header:

```bash
x-seed-secret: <SEED_API_SECRET>
```

Optional request body:

```json
{
  "dryRun": true
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/admin/seed-public-content \
  -H "Content-Type: application/json" \
  -H "x-seed-secret: your-secret" \
  -d "{\"dryRun\":true}"
```

### CLI Seed

The CLI auto-loads `.env.local` / `.env`.

Dry run:

```bash
npm run seed
```

Actual write:

```bash
npm run seed:write
```

Preflight summary:

1. Populate the four required env vars.
2. Run dry-run first.
3. Verify `added` / `skipped` output.
4. Run the write command only after confirming the target Firebase project.
