import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '개인정보 처리방침',
  description: '방과후학교 안내센터가 수집하는 개인정보 항목과 이용 목적, 보관 기준을 안내합니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 px-6 py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-4xl">
        <PageIntro
          icon="security"
          eyebrow="Privacy"
          title="개인정보 처리방침"
          description="서비스 운영에 필요한 최소한의 개인정보만 수집하며, 신청 확인과 운영 안내 목적 범위 안에서 안전하게 관리합니다."
          align="center"
        />

        <div className="mt-12 space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 leading-7 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">1. 수집하는 개인정보 항목</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>필수 항목: 이름, 이메일, 연락처, 비밀번호</li>
              <li>선택 항목: 학교명, 학년, 반 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">2. 이용 목적</h2>
            <p>
              회원 가입, 수강 신청 접수, 신청 현황 확인, 공지 안내, 문의 응대 등 서비스 운영에
              필요한 범위 안에서 개인정보를 이용합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">3. 보관 기간</h2>
            <p>
              수집 목적이 달성되거나 관련 법령상 보관 의무가 종료되면 지체 없이 파기합니다. 단,
              분쟁 대응이나 법적 의무 이행이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
