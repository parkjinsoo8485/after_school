import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '이용약관',
  description: '방과후학교 안내센터 서비스 이용을 위한 기본 조건과 책임 범위를 안내합니다.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 px-6 py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-4xl">
        <PageIntro
          icon="description"
          eyebrow="Policy"
          title="이용약관"
          description="서비스 이용에 필요한 기본 조건과 운영 원칙을 안내합니다. 실제 학교 운영 기준과 개별 안내가 우선 적용될 수 있습니다."
          align="center"
        />

        <div className="mt-12 space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 leading-7 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">제1조 목적</h2>
            <p>
              본 약관은 방과후학교 안내센터가 제공하는 강좌 조회, 수강 신청, 공지 확인, 문의 접수
              서비스의 이용 조건과 운영 기준을 정하는 것을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">제2조 서비스 범위</h2>
            <p>
              서비스는 강좌 정보 제공, 신청 접수, 공지 열람, 계정 관리, 문의 접수 기능을 포함합니다.
              일부 상세 내용은 학교별 운영 정책에 따라 달라질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">제3조 회원의 책임</h2>
            <p>
              회원은 정확한 정보를 입력해야 하며, 계정 정보 관리 부주의로 발생하는 문제에 대해
              책임을 집니다. 허위 신청이나 타인 정보 도용은 제한 사유가 될 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
