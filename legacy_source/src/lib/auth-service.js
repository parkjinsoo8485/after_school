import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error('Login Error:', error.code, error.message);
        return {
            user: null,
            error: {
                code: error.code || 'auth/unknown',
                message: error.message || '로그인 중 오류가 발생했습니다.'
            }
        };
    }
};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        return { user: result.user, error: null };
    } catch (error) {
        console.error('Google Login Error:', error.code, error.message);
        return {
            user: null,
            error: {
                code: error.code || 'auth/unknown',
                message: error.message || '구글 로그인 중 오류가 발생했습니다.'
            }
        };
    }
};
