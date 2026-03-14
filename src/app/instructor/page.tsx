import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import { buildMetadata } from '@/lib/site';

const instructors = [
  {
    name: '김미래 강사',
    field: '창의 로봇 / 코딩',
    summary:
      '블록 코딩부터 센서 응용까지 단계별 수업을 운영하며, 학년별 프로젝트 중심 활동으로 문제 해결력을 키웁니다.',
  },
  {
    name: '이소리 강사',
    field: 'K-POP 댄스',
    summary:
      '기초 체력과 표현력을 함께 다루는 수업을 진행하며, 발표 경험을 통해 자신감을 높이는 프로그램을 운영합니다.',
  },
  {
    name: '박지훈 강사',
    field: '기초 코딩 / Scratch',
    summary:
      '게임과 애니메이션 만들기를 통해 논리적 사고와 디지털 창작 경험을 자연스럽게 익히도록 돕습니다.',
  },
];

export const metadata: Metadata = buildMetadata({
  title: '강사진 소개',
  description: '방과후학교 주요 프로그램을 운영하는 강사진의 분야와 수업 특징을 소개합니다.',
  path: '/instructor',
});

export default function InstructorPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 px-6 py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl">
        <PageIntro
          icon="badge"
          eyebrow="Instructor"
          title="학생의 성장을 이끄는 강사진"
          description="프로그램 성격에 맞는 강사를 배정하고, 운영 전 사전 안내를 통해 학부모가 수업 방향을 쉽게 이해할 수 있도록 돕습니다."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instructors.map((instructor, index) => (
            <article
              key={instructor.name}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-2xl font-black">{index + 1}</span>
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">{instructor.field}</p>
              <h2 className="mb-4 text-2xl font-black text-slate-900 dark:text-white">{instructor.name}</h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{instructor.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
