import type { Metadata } from 'next';
import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '비밀번호 찾기',
  description: '비밀번호 재설정 안내와 문의 경로를 확인할 수 있습니다.',
  path: '/forgot-password',
});

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 px-6 py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <PageIntro
          icon="lock_reset"
          eyebrow="Account"
          title="비밀번호 찾기"
          description="재설정 기능은 현재 운영팀 확인을 거쳐 순차 제공하고 있습니다. 급한 경우 문의 페이지를 통해 계정 정보를 남겨 주세요."
          align="center"
        />

        <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left text-sm leading-7 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
          가입한 이메일 주소와 학교명을 함께 남겨 주시면 계정 확인 후 재설정 절차를 안내해
          드립니다.
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/inquiry"
            className="flex-1 rounded-2xl bg-primary px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:brightness-110"
          >
            문의 페이지로 이동
          </Link>
          <Link
            href="/login"
            className="flex-1 rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
