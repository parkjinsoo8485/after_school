const { loadEnvConfig } = require('@next/env');
const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

loadEnvConfig(process.cwd());

const demoCourses = [
  {
    title: 'AI 스토리 메이커 랩',
    description:
      '생성형 AI와 글쓰기 활동을 결합해 나만의 짧은 이야기와 발표 자료를 만드는 창작형 수업입니다.',
    category: '언어/인문',
    status: 'active',
    schedule: '매주 수 15:10 - 16:30',
    targetGrade: '4~6학년',
    instructor: '정해봄 강사',
    imageUrl: '/images/course2.png',
    source: 'seed-cli',
  },
  {
    title: '주니어 메이커 공작실',
    description:
      '생활 속 문제를 직접 설계하고 만들며 협업과 발표를 경험하는 프로젝트형 메이커 프로그램입니다.',
    category: 'IT/과학',
    status: 'active',
    schedule: '매주 목 14:20 - 15:50',
    targetGrade: '2~5학년',
    instructor: '한도윤 강사',
    imageUrl: '/images/course1.png',
    source: 'seed-cli',
  },
];

const demoNotices = [
  {
    title: '신규 프로그램 오리엔테이션 안내',
    content:
      '새로 개설된 프로그램은 첫 주에 간단한 오리엔테이션을 진행합니다. 준비물과 운영 방식은 첫 수업 전 다시 안내됩니다.',
    date: '2026.03.08',
    number: '125',
    views: 98,
    source: 'seed-cli',
  },
];

const REQUIRED_ENV_KEYS = [
  'FIREBASE_ADMIN_PROJECT_ID',
  'FIREBASE_ADMIN_CLIENT_EMAIL',
  'FIREBASE_ADMIN_PRIVATE_KEY',
];

function printUsage() {
  console.log(`Usage:
  npm run seed
  node seed_data.js --write --confirm

Options:
  --write     Actually write documents to Firestore
  --confirm   Required together with --write to prevent accidental writes
  --help      Show this message`);
}

function getMissingEnvKeys() {
  return REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);
}

function assertReadyToRun() {
  const missing = getMissingEnvKeys();

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'The CLI loads .env.local/.env automatically via @next/env.',
    );
  }

  const privateKey = String(process.env.FIREBASE_ADMIN_PRIVATE_KEY);

  if (!privateKey.includes('\\n') && !privateKey.includes('\n')) {
    console.warn(
      '[seed] FIREBASE_ADMIN_PRIVATE_KEY does not include escaped newlines (\\n). ' +
        'If you stored the key as a single line in .env.local, verify the format before writing.',
    );
  }
}

function getAdminDb() {
  const existing = getApps()[0];
  if (existing) {
    return getFirestore(existing);
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.',
    );
  }

  const app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  return getFirestore(app);
}

async function addIfMissing(collectionName, payload, dryRun) {
  const db = getAdminDb();
  const snapshot = await db.collection(collectionName).where('title', '==', payload.title).limit(1).get();

  if (!snapshot.empty) {
    return {
      collection: collectionName,
      title: payload.title,
      status: 'skipped',
      id: snapshot.docs[0].id,
    };
  }

  if (dryRun) {
    return {
      collection: collectionName,
      title: payload.title,
      status: 'added',
    };
  }

  const docRef = await db.collection(collectionName).add({
    ...payload,
    createdAt: new Date(),
  });

  return {
    collection: collectionName,
    title: payload.title,
    status: 'added',
    id: docRef.id,
  };
}

async function main() {
  const args = new Set(process.argv.slice(2));

  if (args.has('--help')) {
    printUsage();
    return;
  }

  const shouldWrite = args.has('--write');
  const confirmed = args.has('--confirm');
  const dryRun = !shouldWrite;

  if (shouldWrite && !confirmed) {
    throw new Error('Refusing to write without --confirm. Use: node seed_data.js --write --confirm');
  }

  assertReadyToRun();
  const results = [];

  for (const course of demoCourses) {
    results.push(await addIfMissing('courses', course, dryRun));
  }

  for (const notice of demoNotices) {
    results.push(await addIfMissing('notices', notice, dryRun));
  }

  console.log(
    `[seed] mode=${dryRun ? 'dry-run' : 'write'} courses=${demoCourses.length} notices=${demoNotices.length}`,
  );
  console.log(JSON.stringify({ dryRun, results }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
