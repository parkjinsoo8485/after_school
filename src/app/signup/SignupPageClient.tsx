'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function SignupPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    school: '',
    grade: '',
    classNum: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        school: formData.school,
        grade: formData.grade,
        class: formData.classNum,
        createdAt: new Date().toISOString(),
      });

      router.push('/login');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(204,102,68,0.12),_transparent_32%),linear-gradient(180deg,_#fffdf8_0%,_#f8fafc_42%,_#eef4ff_100%)]">
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[28px] border border-white/80 bg-white/80 p-8 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Create Account</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900">
              학생 정보를 한 번 입력하면 신청과 조회가 훨씬 간단해집니다.
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              회원가입 후 학교, 학년, 연락처 정보를 기반으로 수강 신청과 마이페이지 확인 흐름을
              더 빠르게 이용할 수 있습니다.
            </p>

            <div className="mt-8 space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <h2 className="text-sm font-bold text-slate-900">가입 전 확인하세요</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  이메일은 안내 메일과 문의 답변 확인에 사용됩니다.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <h2 className="text-sm font-bold text-slate-900">비밀번호 규칙</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  8자 이상으로 설정하고, 다른 사이트와 동일한 비밀번호 사용은 피하세요.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/80 bg-white p-8 shadow-xl sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">회원가입</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                필수 정보를 입력하면 학생 계정을 바로 생성할 수 있습니다.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">이름</label>
                  <input
                    name="name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="이름 입력"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">이메일</label>
                  <input
                    name="email"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="example@email.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">비밀번호</label>
                  <input
                    name="password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="8자 이상"
                    required
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">비밀번호 확인</label>
                  <input
                    name="passwordConfirm"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="비밀번호 다시 입력"
                    required
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">연락처</label>
                  <input
                    name="phone"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="010-0000-0000"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">학교</label>
                  <select
                    name="school"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    required
                    value={formData.school}
                    onChange={handleChange}
                  >
                    <option value="">학교 선택</option>
                    <option value="시흥초등학교">시흥초등학교</option>
                    <option value="강남초등학교">강남초등학교</option>
                    <option value="서초초등학교">서초초등학교</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">학년</label>
                  <select
                    name="grade"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                  >
                    <option value="">학년 선택</option>
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>{grade}학년</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-sm font-semibold text-slate-700">반</label>
                  <select
                    name="classNum"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                    required
                    value={formData.classNum}
                    onChange={handleChange}
                  >
                    <option value="">반 선택</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classNum) => (
                      <option key={classNum} value={classNum}>{classNum}반</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? '가입 처리 중...' : '회원가입 완료'}
              </button>
            </form>

            <div className="mt-8 rounded-2xl bg-slate-50 px-5 py-4 text-center text-sm text-slate-600">
              이미 계정이 있으신가요?
              <Link className="ml-1 font-bold text-primary hover:underline" href="/login">
                로그인하기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
