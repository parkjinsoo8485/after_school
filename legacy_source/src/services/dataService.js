import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const itemsRef = collection(db, 'items');

export async function listItems(uid) {
  const q = query(itemsRef, where('createdBy', '==', uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createItem(payload, uid) {
  return addDoc(itemsRef, {
    ...payload,
    createdBy: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function editItem(id, payload) {
  return updateDoc(doc(db, 'items', id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function removeItem(id) {
  return deleteDoc(doc(db, 'items', id));
}