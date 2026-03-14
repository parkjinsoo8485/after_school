import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const projectId = process.env.GCLOUD_PROJECT || 'demo-after-school';

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
}
if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
}

initializeApp({ projectId });

const db = getFirestore();
const auth = getAuth();

const users = [
  { uid: 'admin-001', email: 'admin@afterschool.local', displayName: 'Admin User', role: 'admin' },
  { uid: 'teacher-001', email: 'teacher@afterschool.local', displayName: 'Teacher Kim', role: 'user' },
  { uid: 'staff-001', email: 'staff@afterschool.local', displayName: 'Staff Lee', role: 'user' },
];

const courses = [
  {
    title: '주니어 로봇 제작소',
    description: '레고 마인드스톰을 활용한 로봇 공학 기초',
    category: '창의과학',
    schedule: '월, 수 • 15:30 - 17:00',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=500'
  },
  {
    title: 'K-POP 방송댄스',
    description: '최신 유행하는 K-POP 안무 배우기',
    category: '문화예술',
    schedule: '화, 목 • 16:00 - 17:30',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500'
  }
];

async function upsertUsers() {
  for (const user of users) {
    try {
      await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: 'Password123!'
      });
    } catch (err) {
      if (!String(err?.message || '').includes('uid already exists')) {
        throw err;
      }
    }
    await auth.setCustomUserClaims(user.uid, { role: user.role });

    await db.collection('users').doc(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  }
}

async function upsertCourses() {
  const batch = db.batch();
  for (const course of courses) {
    const ref = db.collection('courses').doc();
    batch.set(ref, {
      ...course,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
}

async function main() {
  console.log('Seeding emulator data...');
  await upsertUsers();
  await upsertCourses();
  console.log('Seed complete.');
  console.log('Test accounts:');
  console.log('- admin@afterschool.local / Password123!');
  console.log('- teacher@afterschool.local / Password123!');
  console.log('- staff@afterschool.local / Password123!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});