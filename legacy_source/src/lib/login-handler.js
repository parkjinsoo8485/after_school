import { loginWithEmail } from './auth-service.js';

const SAVED_IDENTIFIER_KEY = 'saved_login_identifier';

function normalizeIdentifier(rawValue) {
    const value = rawValue.trim();
    if (!value) return '';
    return value.includes('@') ? value.toLowerCase() : value.toLowerCase();
}

function toEmail(identifier) {
    return identifier.includes('@') ? identifier : `${identifier}@afterschool.local`;
}

function getFriendlyMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return '이메일 형식이 올바르지 않습니다.';
        case 'auth/user-disabled':
            return '사용이 중지된 계정입니다. 관리자에게 문의해 주세요.';
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
            return '아이디 또는 비밀번호가 올바르지 않습니다.';
        case 'auth/too-many-requests':
            return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.';
        default:
            return '로그인에 실패했습니다. 입력 정보를 다시 확인해 주세요.';
    }
}

function setFeedback(message, type = 'error') {
    const feedbackEl = document.getElementById('auth-feedback');
    if (!feedbackEl) {
        if (window.showToast) window.showToast(message, type);
        return;
    }

    const classes = {
        error: 'border-red-200 bg-red-50 text-red-700',
        success: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    };

    feedbackEl.className = `mb-5 rounded-2xl border px-4 py-3 text-sm font-medium ${classes[type]}`;
    feedbackEl.textContent = message;
    feedbackEl.classList.remove('hidden');

    if (window.showToast) window.showToast(message, type);
}

function clearFeedback() {
    const feedbackEl = document.getElementById('auth-feedback');
    if (feedbackEl) feedbackEl.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form') || document.querySelector('form');
    if (!loginForm) return;

    const idInput = document.getElementById('email') || loginForm.querySelector('input[type="text"]');
    const pwInput = document.getElementById('password') || loginForm.querySelector('input[type="password"]');
    const rememberCheckbox = document.getElementById('remember-id');
    const submitButton = document.getElementById('login-submit') || loginForm.querySelector('button[type="submit"]');
    const togglePwBtn = document.getElementById('toggle-password') || loginForm.querySelector('button[type="button"]');

    const savedIdentifier = localStorage.getItem(SAVED_IDENTIFIER_KEY);
    if (savedIdentifier && idInput) {
        idInput.value = savedIdentifier;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    if (idInput) {
        idInput.addEventListener('input', () => clearFeedback());
    }
    if (pwInput) {
        pwInput.addEventListener('input', () => clearFeedback());
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!idInput || !pwInput || !submitButton) return;

        const identifier = normalizeIdentifier(idInput.value);
        const password = pwInput.value;

        if (!identifier || !password) {
            setFeedback('아이디와 비밀번호를 모두 입력해 주세요.');
            return;
        }

        if (password.length < 8) {
            setFeedback('비밀번호는 8자 이상 입력해 주세요.');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = submitButton.dataset.loadingText || '로그인 중...';
        clearFeedback();

        const email = toEmail(identifier);
        const { user, error } = await loginWithEmail(email, password);

        if (user) {
            if (rememberCheckbox?.checked) {
                localStorage.setItem(SAVED_IDENTIFIER_KEY, identifier);
            } else {
                localStorage.removeItem(SAVED_IDENTIFIER_KEY);
            }

            setFeedback(`${user.displayName || identifier}님, 다시 오셨네요.`, 'success');

            window.setTimeout(() => {
                const redirectUrl = sessionStorage.getItem('redirect_after_login');
                sessionStorage.removeItem('redirect_after_login');
                window.location.href = redirectUrl || '/index.html';
            }, 700);
            return;
        }

        setFeedback(getFriendlyMessage(error?.code));
        submitButton.disabled = false;
        submitButton.textContent = '로그인';
    });

    if (togglePwBtn && pwInput) {
        togglePwBtn.addEventListener('click', () => {
            const isPassword = pwInput.type === 'password';
            pwInput.type = isPassword ? 'text' : 'password';
            const icon = togglePwBtn.querySelector('span');
            if (icon) icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    }
});
