import { createContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);
      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(ref);
        setProfile(snap.exists() ? snap.data() : { role: 'user', displayName: firebaseUser.email });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(
    () => ({ user, profile, loading, isAdmin: profile?.role === 'admin' }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}