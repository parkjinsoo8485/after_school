import type { Metadata } from 'next';
import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';

const faqs = [
  {
    question: '수강 신청은 어떻게 하나요?',
    answer:
      '강좌 목록에서 원하는 프로그램을 선택한 뒤 상세 페이지의 수강 신청 버튼을 누르면 됩니다. 로그인 후 신청 내역은 마이페이지에서 확인할 수 있습니다.',
  },
  {
    question: '수강 대상 학년은 어디서 확인하나요?',
    answer:
      '각 강좌 카드와 상세 페이지에 대상 학년이 함께 표기됩니다. 세부 기준이 필요한 경우 공지사항이나 문의 페이지를 통해 확인해 주세요.',
  },
  {
    question: '신청 후 바로 확정되나요?',
    answer:
      '강좌별 정원과 운영 확인 절차가 있어 즉시 확정되지 않을 수 있습니다. 승인 여부는 마이페이지와 개별 안내를 통해 확인할 수 있습니다.',
  },
  {
    question: '수업 시간과 장소는 변경될 수 있나요?',
    answer:
      '학교 일정이나 강사 운영 상황에 따라 변경될 수 있습니다. 주요 변경 사항은 공지사항과 개별 안내를 통해 전달됩니다.',
  },
  {
    question: '문의는 어디로 남기면 되나요?',
    answer:
      '문의 페이지에서 이름, 연락 가능한 이메일, 문의 유형을 남겨 주세요. 운영시간 내 접수 건은 순차적으로 확인해 답변드립니다.',
  },
];

export const metadata: Metadata = buildMetadata({
  title: '자주 묻는 질문',
  description: '수강 신청, 대상 학년, 승인 절차, 운영 변경과 관련해 자주 들어오는 질문을 정리했습니다.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 px-6 py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-4xl">
        <PageIntro
          icon="help"
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="학부모와 학생이 가장 자주 확인하는 내용을 먼저 정리했습니다. 찾는 답이 없다면 문의 페이지에서 바로 남길 수 있습니다."
          align="center"
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="mb-3 flex items-start gap-3 text-lg font-bold text-slate-900 dark:text-white">
                <span className="mt-0.5 text-primary">Q.</span>
                <span>{faq.question}</span>
              </h2>
              <p className="pl-7 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] bg-primary px-8 py-7 text-white shadow-lg shadow-primary/20">
          <h2 className="text-2xl font-black">추가로 확인할 내용이 있나요?</h2>
          <p className="mt-3 text-sm leading-7 text-white/85">
            학교명, 학생 학년, 관심 강좌를 함께 남겨 주시면 더 빠르게 답변할 수 있습니다.
          </p>
          <Link
            href="/inquiry"
            className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-primary"
          >
            문의 페이지로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
