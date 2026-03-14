import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './firebase';

export async function getDashboardStats(uid) {
  const itemsSnap = await getDocs(query(collection(db, 'items'), limit(200)));
  const userSnap = await getDocs(query(collection(db, 'users'), limit(200)));
  const myItems = itemsSnap.docs.filter((d) => d.data().createdBy === uid);

  return {
    totalItems: myItems.length,
    totalUsers: userSnap.size,
    activeItems: myItems.filter((x) => x.data().status === 'active').length,
  };
}