import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase.js';

const SAVED_IDENTIFIER_KEY = 'saved_login_identifier';
const IDENTIFIER_PATTERN = /^[a-z0-9._-]+$/;

function normalizeIdentifier(rawValue) {
    return rawValue.trim().toLowerCase();
}

function normalizePhone(rawValue) {
    const digits = rawValue.replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function toEmail(identifier) {
    return identifier.includes('@') ? identifier : `${identifier}@afterschool.local`;
}

function setFeedback(message, type = 'error') {
    const feedbackEl = document.getElementById('signup-feedback');
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
    const feedbackEl = document.getElementById('signup-feedback');
    if (feedbackEl) feedbackEl.classList.add('hidden');
}

function getFriendlyErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return '이미 사용 중인 아이디 또는 이메일입니다.';
        case 'auth/invalid-email':
            return '이메일 형식이 올바르지 않습니다.';
        case 'auth/weak-password':
            return '비밀번호가 너무 약합니다. 영문과 숫자를 포함해 8자 이상으로 설정해 주세요.';
        default:
            return '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('signup-form') || document.querySelector('form');
    if (!registerForm) return;

    const nameInput = document.getElementById('name');
    const idInput = document.getElementById('identifier');
    const pwInput = document.getElementById('password');
    const pwConfirmInput = document.getElementById('passwordConfirm');
    const phoneInput = document.getElementById('phone');
    const schoolSelect = document.getElementById('school');
    const gradeSelect = document.getElementById('grade');
    const classSelect = document.getElementById('class');
    const termsCheckbox = document.getElementById('terms-agree');
    const submitButton = document.getElementById('signup-submit') || registerForm.querySelector('button[type="submit"]');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = normalizePhone(phoneInput.value);
            clearFeedback();
        });
    }

    [nameInput, idInput, pwInput, pwConfirmInput].forEach((field) => {
        field?.addEventListener('input', clearFeedback);
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!submitButton) return;

        const name = nameInput?.value.trim() || '';
        const identifier = normalizeIdentifier(idInput?.value || '');
        const password = pwInput?.value || '';
        const passwordConfirm = pwConfirmInput?.value || '';
        const phone = normalizePhone(phoneInput?.value || '');
        const schoolId = schoolSelect?.value || '';
        const grade = gradeSelect?.value || '';
        const className = classSelect?.value || '';

        if (!name || !identifier || !password || !passwordConfirm || !phone || !schoolId || !grade || !className) {
            setFeedback('필수 항목을 모두 입력해 주세요.');
            return;
        }

        if (!termsCheckbox?.checked) {
            setFeedback('이용약관 및 개인정보 처리방침 동의가 필요합니다.');
            return;
        }

        if (!identifier.includes('@') && !IDENTIFIER_PATTERN.test(identifier)) {
            setFeedback('아이디는 영문, 숫자, 마침표(.), 밑줄(_), 하이픈(-)만 사용할 수 있습니다.');
            return;
        }

        if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            setFeedback('비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 합니다.');
            return;
        }

        if (password !== passwordConfirm) {
            setFeedback('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (phone.replace(/\D/g, '').length < 10) {
            setFeedback('연락처를 정확히 입력해 주세요.');
            return;
        }

        clearFeedback();
        submitButton.disabled = true;
        submitButton.textContent = submitButton.dataset.loadingText || '계정 생성 중...';

        const email = toEmail(identifier);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, 'users', user.uid), {
                displayName: name,
                email,
                loginIdentifier: identifier,
                phone,
                schoolId,
                grade,
                className,
                role: 'user',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            localStorage.setItem(SAVED_IDENTIFIER_KEY, identifier);
            setFeedback('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.', 'success');

            window.setTimeout(() => {
                window.location.href = '/src/login.html';
            }, 900);
        } catch (error) {
            console.error('Register Error:', error);
            setFeedback(getFriendlyErrorMessage(error.code));
            submitButton.disabled = false;
            submitButton.textContent = '회원가입 완료';
        }
    });
});
