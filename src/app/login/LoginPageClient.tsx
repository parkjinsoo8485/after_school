'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa6';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import { auth } from '@/lib/firebase';
import {
  getSocialLoginOptions,
  signInWithSocialProvider,
  type SocialProviderKey,
} from '@/lib/social-auth';

const socialButtonStyles: Record<SocialProviderKey, string> = {
  google:
    'border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50',
  kakao: 'bg-[#FEE500] text-slate-900 hover:brightness-95',
  naver: 'bg-[#03C75A] text-white hover:brightness-95',
};

const socialIcons: Record<SocialProviderKey, React.ReactNode> = {
  google: <FaGoogle className="text-base" aria-hidden />,
  kakao: <SiKakaotalk className="text-lg" aria-hidden />,
  naver: <SiNaver className="text-base" aria-hidden />,
};

function getAuthErrorMessage(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return '이메일 또는 비밀번호를 다시 확인해 주세요.';
    case 'auth/popup-closed-by-user':
      return '로그인 창이 닫혔습니다. 다시 시도해 주세요.';
    case 'auth/popup-blocked':
      return '브라우저가 로그인 팝업을 차단했습니다. 팝업 허용 후 다시 시도해 주세요.';
    case 'auth/account-exists-with-different-credential':
      return '같은 이메일로 다른 로그인 방식이 이미 연결되어 있습니다.';
    case 'auth/operation-not-allowed':
      return '선택한 로그인 방식이 Firebase Authentication 콘솔에서 아직 활성화되지 않았습니다.';
    case 'auth/unauthorized-domain':
      return '현재 도메인(localhost:3000)이 Firebase 인증 허용 도메인에 등록되어 있지 않습니다.';
    case 'auth/invalid-provider-id':
      return '소셜 로그인 provider ID가 올바르지 않습니다. 환경변수를 확인해 주세요.';
    default:
      return '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
  }
}

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<'email' | SocialProviderKey | null>(null);
  const router = useRouter();
  const socialProviders = getSocialLoginOptions();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingProvider('email');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSocialLogin = async (provider: SocialProviderKey) => {
    setError('');
    setLoadingProvider(provider);

    try {
      await signInWithSocialProvider(provider, rememberMe);
      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[440px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">Account</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900">로그인</h1>
          <p className="mt-2 text-sm text-slate-500">
            수강 신청과 신청 현황 확인을 위해 계정 정보를 입력해 주세요.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">이메일</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                mail
              </span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="이메일을 입력해 주세요"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">비밀번호</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
                lock
              </span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="group flex cursor-pointer items-center gap-2">
              <input
                className="rounded border-slate-300 text-primary focus:ring-primary"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900">로그인 상태 유지</span>
            </label>
            <Link className="text-xs text-slate-500 underline underline-offset-4 hover:text-primary" href="/forgot-password">
              비밀번호 찾기
            </Link>
          </div>

          <button
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loadingProvider !== null}
          >
            {loadingProvider === 'email' ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-500">또는 간편 로그인</span>
          </div>
        </div>

        <div className="grid gap-3">
          {socialProviders.map((provider) => (
            <button
              key={provider.key}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${socialButtonStyles[provider.key]}`}
              onClick={() => handleSocialLogin(provider.key)}
              type="button"
              disabled={loadingProvider !== null}
            >
              {socialIcons[provider.key]}
              <span>
                {loadingProvider === provider.key
                  ? `${provider.label} 로그인 중...`
                  : `${provider.label}로 로그인`}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          카카오와 네이버는 Firebase Authentication with Identity Platform에서 OIDC provider로 등록되어 있어야 동작합니다.
        </p>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-600">
          아직 회원이 아니신가요?
          <Link className="ml-2 font-bold text-primary hover:underline" href="/signup">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
