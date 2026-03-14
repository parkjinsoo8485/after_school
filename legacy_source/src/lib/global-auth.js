import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

const MYPAGE_URL = '/src/학생용_마이페이지_576a1e5f.html';
const LOGIN_URL = '/src/login.html';
const HOME_URL = '/index.html';
const AUTH_PATHS = ['/src/login.html', '/src/signup.html', '/src/forgot-password.html'];
const PROTECTED_PATHS = [
    '/src/학생용_마이페이지_576a1e5f.html',
    '/src/course-detail.html',
    '/src/inquiry.html'
];

function redirectIfNeeded(user) {
    const currentPath = decodeURIComponent(window.location.pathname);
    const isAuthPage = AUTH_PATHS.includes(currentPath);
    const isProtectedPage = PROTECTED_PATHS.includes(currentPath);

    if (user && isAuthPage) {
        const redirectUrl = sessionStorage.getItem('redirect_after_login');
        if (redirectUrl) {
            sessionStorage.removeItem('redirect_after_login');
            window.location.replace(redirectUrl);
            return true;
        }

        window.location.replace(MYPAGE_URL);
        return true;
    }

    if (!user && isProtectedPage) {
        sessionStorage.setItem('redirect_after_login', window.location.href);
        window.location.replace(LOGIN_URL);
        return true;
    }

    return false;
}

function bindLogoutButton(button) {
    if (!button) return;

    button.onclick = async (event) => {
        event.preventDefault();

        try {
            await signOut(auth);
            window.location.href = HOME_URL;
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('auth-login-btn');
    const signupBtn = document.getElementById('auth-signup-btn');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const mypageBtn = document.getElementById('auth-mypage-btn');
    const userInfoEl = document.getElementById('auth-user-info');
    const mobileLoginBtn = document.getElementById('mobile-auth-login-btn');
    const mobileLogoutBtn = document.getElementById('mobile-auth-logout-btn');

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';

        if (logoutBtn) {
            logoutBtn.style.display = '';
            bindLogoutButton(logoutBtn);
        }

        if (mypageBtn) {
            mypageBtn.style.display = '';
            mypageBtn.href = MYPAGE_URL;
        }

        if (userInfoEl) {
            const name = user.displayName || user.email?.split('@')[0] || '사용자';
            userInfoEl.textContent = `${name}님`;
            userInfoEl.style.display = '';
        }

        if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
        if (mobileLogoutBtn) {
            mobileLogoutBtn.style.display = '';
            bindLogoutButton(mobileLogoutBtn);
        }

        return;
    }

    if (loginBtn) loginBtn.style.display = '';
    if (signupBtn) signupBtn.style.display = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (mypageBtn) mypageBtn.style.display = 'none';
    if (userInfoEl) userInfoEl.style.display = 'none';
    if (mobileLoginBtn) mobileLoginBtn.style.display = '';
    if (mobileLogoutBtn) mobileLogoutBtn.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (redirectIfNeeded(user)) return;
        updateAuthUI(user);
    });
});
