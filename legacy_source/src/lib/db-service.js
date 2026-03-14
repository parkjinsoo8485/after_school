import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

export const getCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAttendance = async (studentId, date) => {
  const q = query(collection(db, "attendance"), 
    where("studentId", "==", studentId),
    where("date", "==", date));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveAttendance = async (data) => {
  return await addDoc(collection(db, "attendance"), {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const getNotices = async () => {
  const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
