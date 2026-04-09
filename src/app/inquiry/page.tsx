import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';
import InquiryForm from './InquiryForm';

export const metadata: Metadata = buildMetadata({
  title: '문의하기',
  description: '수강 신청, 운영 시간, 결제, 준비물 등 방과후학교 관련 문의를 남길 수 있습니다.',
  path: '/inquiry',
});

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(204,102,68,0.08),_transparent_32%),linear-gradient(180deg,_#fffdfb_0%,_#f8fafc_100%)] px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur">
          <PageIntro
            icon="support_agent"
            eyebrow="Support"
            title={<span className="whitespace-nowrap">운영팀에 문의 남기기</span>}
            description="수강 신청, 운영 일정, 결제, 준비물, 대기 상태 등 궁금한 내용을 남겨 주세요. 운영시간 내 접수 건은 순차적으로 확인합니다."
          />

          <div className="mt-8 space-y-4 rounded-[1.5rem] bg-slate-50 p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">운영 시간</p>
              <p className="mt-2 text-sm font-medium text-slate-700">평일 오전 9:00 - 오후 6:00</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">답변 기준</p>
              <p className="mt-2 text-sm font-medium text-slate-700">영업일 기준 1일 이내 순차 답변</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">빠른 확인 팁</p>
              <p className="mt-2 text-sm font-medium text-slate-700">학교명, 학생 학년, 강좌명을 함께 적어 주세요.</p>
            </div>
          </div>
        </section>

        <InquiryForm />
      </div>
    </main>
  );
}
