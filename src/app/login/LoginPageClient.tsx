'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPageClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해 주세요.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-900/50">
      <div className="w-full max-w-[440px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">Account</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">로그인</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
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
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">이메일</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">mail</span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">비밀번호</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">lock</span>
              <input
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
              <input className="rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800" type="checkbox" />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200">
                로그인 상태 유지
              </span>
            </label>
            <Link className="text-xs text-slate-500 underline underline-offset-4 hover:text-primary dark:text-slate-400" href="/forgot-password">
              비밀번호 찾기
            </Link>
          </div>

          <button className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary/90" type="submit">
            로그인
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-500 dark:bg-slate-900 dark:text-slate-400">또는 간편 로그인</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-medium text-slate-900 transition-opacity hover:opacity-90">
            카카오
          </button>
          <button className="rounded-lg bg-[#03C75A] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
            네이버
          </button>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
          아직 회원이 아니신가요?
          <Link className="ml-2 font-bold text-primary hover:underline" href="/signup">
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
