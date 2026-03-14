import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0uuh6u9xX4qU8LzMmvfJ-orSCJd4vez8",
  authDomain: "afterschool-74294.firebaseapp.com",
  projectId: "afterschool-74294",
  storageBucket: "afterschool-74294.firebasestorage.app",
  messagingSenderId: "937910921889",
  appId: "1:937910921889:web:9c7e1d289a929e2eef1ee0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
