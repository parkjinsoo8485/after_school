import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}