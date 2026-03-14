import 'server-only';

import { getAdminDb } from './firebase-admin';
import { demoCourses, demoNotices } from './demo-content';

type SeedOptions = {
  dryRun?: boolean;
};

type SeedResult = {
  collection: 'courses' | 'notices';
  title: string;
  status: 'added' | 'skipped';
  id?: string;
};

async function addIfMissing(
  collectionName: 'courses' | 'notices',
  payload: Record<string, unknown>,
  dryRun: boolean,
): Promise<SeedResult> {
  const db = getAdminDb();
  const snapshot = await db.collection(collectionName).where('title', '==', payload.title).limit(1).get();

  if (!snapshot.empty) {
    return {
      collection: collectionName,
      title: String(payload.title),
      status: 'skipped',
      id: snapshot.docs[0].id,
    };
  }

  if (dryRun) {
    return {
      collection: collectionName,
      title: String(payload.title),
      status: 'added',
    };
  }

  const docRef = await db.collection(collectionName).add({
    ...payload,
    createdAt: new Date(),
    source: 'admin-seed-api',
  });

  return {
    collection: collectionName,
    title: String(payload.title),
    status: 'added',
    id: docRef.id,
  };
}

export async function seedPublicDemoContent(options: SeedOptions = {}) {
  const dryRun = options.dryRun ?? false;
  const results: SeedResult[] = [];

  for (const course of demoCourses) {
    const { id: _id, ...payload } = course;
    results.push(await addIfMissing('courses', payload, dryRun));
  }

  for (const notice of demoNotices) {
    const { id: _id, ...payload } = notice;
    results.push(await addIfMissing('notices', payload, dryRun));
  }

  return {
    dryRun,
    results,
  };
}
