import { db } from './firebase';
import { demoCourses, demoNotices } from './demo-content';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

export interface Course {
  id: string;
  title: string;
  description: string;
  category?: string;
  status: 'active' | 'closed';
  schedule?: string;
  imageUrl?: string;
  targetGrade?: string;
  instructor?: string;
}

export interface Notice {
  id: string;
  title: string;
  content?: string;
  date?: string;
  number?: string;
  views?: number;
  createdAt?: {
    toDate?: () => Date;
  };
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  status: 'pending' | 'approved' | 'completed' | string;
  createdAt?: {
    toDate?: () => Date;
  };
}

function mergeCourses(courses: Course[]): Course[] {
  const merged = [...courses];
  const seenTitles = new Set(courses.map((course) => course.title));

  for (const course of demoCourses) {
    if (!seenTitles.has(course.title)) {
      merged.push(course);
    }
  }

  return merged;
}

function normalizeNoticeDate(notice: any): Notice {
  if (notice.date) {
    const { createdAt, ...rest } = notice;
    return rest as Notice;
  }

  let createdAtDate: Date | undefined;
  if (notice.createdAt && typeof notice.createdAt.toDate === 'function') {
    createdAtDate = notice.createdAt.toDate();
  } else if (typeof notice.createdAt === 'string') {
    createdAtDate = new Date(notice.createdAt);
  } else if (notice.createdAt && typeof notice.createdAt.seconds === 'number') {
    createdAtDate = new Date(notice.createdAt.seconds * 1000);
  }

  if (!createdAtDate) {
    const { createdAt, ...rest } = notice;
    return rest as Notice;
  }

  const date = `${createdAtDate.getFullYear()}.${String(createdAtDate.getMonth() + 1).padStart(2, '0')}.${String(
    createdAtDate.getDate(),
  ).padStart(2, '0')}`;

  const result = { ...notice, date };
  delete result.createdAt;
  return result as Notice;
}

function mergeNotices(notices: Notice[]): Notice[] {
  const normalized = notices.map(normalizeNoticeDate);
  const seenTitles = new Set(normalized.map((notice) => notice.title));
  const merged = [...normalized];

  for (const notice of demoNotices) {
    if (!seenTitles.has(notice.title)) {
      merged.push(notice);
    }
  }

  return merged;
}

const sanitizeData = (data: any) => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (sanitized[key] && typeof sanitized[key] === 'object') {
      if (typeof sanitized[key].toDate === 'function') {
        sanitized[key] = sanitized[key].toDate().toISOString();
      } else if (typeof sanitized[key].toJSON === 'function') {
        sanitized[key] = sanitized[key].toJSON();
      }
    }
  }
  return sanitized;
};

export const getCourses = async (): Promise<Course[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = querySnapshot.docs.map(doc => {
      const data = sanitizeData(doc.data());
      delete data.createdAt; // Prevent Next.js errors
      delete data.updatedAt;
      return { id: doc.id, ...data } as Course;
    });
    return mergeCourses(courses);
  } catch (error) {
    console.error(error);
    return demoCourses;
  }
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const demoCourse = demoCourses.find((course) => course.id === id);
  if (demoCourse) {
    return demoCourse;
  }

  const docRef = doc(db, "courses", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = sanitizeData(docSnap.data());
    delete data.createdAt;
    delete data.updatedAt;
    return { id: docSnap.id, ...data } as Course;
  }
  return null;
};

export const getNotices = async (): Promise<Notice[]> => {
  try {
    const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const notices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
    return mergeNotices(notices);
  } catch (error) {
    console.error(error);
    return demoNotices;
  }
};

export const enrollCourse = async (courseId: string, userId: string, userName: string) => {
  return await addDoc(collection(db, "enrollments"), {
    courseId,
    userId,
    userName,
    status: 'pending',
    createdAt: serverTimestamp()
  });
};

export const getEnrollmentsByUserId = async (userId: string): Promise<Enrollment[]> => {
  const q = query(collection(db, "enrollments"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = sanitizeData(doc.data());
    return { id: doc.id, ...data } as Enrollment;
  });
};
