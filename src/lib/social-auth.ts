import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  OAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  type AuthProvider,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';

export type SocialProviderKey = 'google' | 'kakao' | 'naver';

type ProviderConfig = {
  label: string;
  providerId?: string;
  build: () => AuthProvider;
};

const providerConfigs: Record<SocialProviderKey, ProviderConfig> = {
  google: {
    label: 'Google',
    build: () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      return provider;
    },
  },
  kakao: {
    label: 'Kakao',
    providerId: process.env.NEXT_PUBLIC_FIREBASE_KAKAO_PROVIDER_ID || 'oidc.kakao',
    build: () => new OAuthProvider(process.env.NEXT_PUBLIC_FIREBASE_KAKAO_PROVIDER_ID || 'oidc.kakao'),
  },
  naver: {
    label: 'Naver',
    providerId: process.env.NEXT_PUBLIC_FIREBASE_NAVER_PROVIDER_ID || 'oidc.naver',
    build: () => new OAuthProvider(process.env.NEXT_PUBLIC_FIREBASE_NAVER_PROVIDER_ID || 'oidc.naver'),
  },
};

export function getSocialLoginOptions() {
  return (Object.entries(providerConfigs) as Array<[SocialProviderKey, ProviderConfig]>).map(([key, value]) => ({
    key,
    label: value.label,
    providerId: value.providerId,
  }));
}

async function ensureUserProfile(provider: SocialProviderKey) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  await setDoc(
    doc(db, 'users', currentUser.uid),
    {
      name: currentUser.displayName || '',
      email: currentUser.email || '',
      photoURL: currentUser.photoURL || '',
      provider,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function signInWithSocialProvider(provider: SocialProviderKey, rememberMe: boolean) {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  const credential = await signInWithPopup(auth, providerConfigs[provider].build());
  await ensureUserProfile(provider);
  return credential;
}
