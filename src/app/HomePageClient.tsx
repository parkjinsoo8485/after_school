'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Course } from '@/lib/db-service';
import CourseImage from '@/components/CourseImage';

const highlights = [
  {
    icon: 'auto_awesome',
    title: '학생 흥미 중심 설계',
    description: '교과 보완이 아니라 실제로 아이가 몰입할 수 있는 경험을 중심으로 프로그램을 큐레이션합니다.',
  },
  {
    icon: 'verified',
    title: '검증된 운영 프로세스',
    description: '강사, 시간표, 준비물, 신청 절차를 명확하게 안내해 학부모가 안심하고 선택할 수 있습니다.',
  },
  {
    icon: 'diversity_3',
    title: '학교와 가정의 연결',
    description: '공지, 신청, 문의 흐름을 한 곳에 모아 운영 정보를 빠르게 확인할 수 있게 구성했습니다.',
  },
];

type HomePageClientProps = {
  initialCourses: Course[];
};

export default function HomePageClient({ initialCourses }: HomePageClientProps) {
  const [courses] = useState<Course[]>(initialCourses);
  const [loading] = useState(initialCourses.length === 0);

  return (
    <div className="flex w-full flex-col">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,162,97,0.24),_transparent_34%),linear-gradient(135deg,_#fffaf3_0%,_#fff_48%,_#eef5ff_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <div className="absolute inset-8 overflow-hidden rounded-[2.75rem] shadow-2xl shadow-orange-100">
            <CourseImage
              src="/images/hero.png"
              alt="학생 활동 모습"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl animate-fade-in">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-primary">
              After School Programs
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-7xl">
              학생의 방과 후가
              <br />
              <span className="text-primary">가장 기대되는 시간</span>
              이 되도록.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-xl md:leading-9">
              방과후학교 안내센터는 강좌 정보를 보기 쉽게 정리하고, 신청과 문의 흐름을 단순하게
              만들어 학부모와 학생이 빠르게 선택할 수 있도록 돕습니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-2xl bg-primary px-8 py-4 text-lg font-black text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.99]"
              >
                강좌 둘러보기
              </Link>
              <Link
                href="/inquiry"
                className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-black text-slate-900 shadow-lg transition-all hover:bg-slate-50"
              >
                상담 문의하기
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end lg:hidden">
            <div className="relative h-72 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-orange-100">
              <CourseImage
                src="/images/hero.png"
                alt="학생 활동 모습"
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[2.5rem] bg-cream p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-800/60"
            >
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h2 className="mb-3 text-2xl font-black text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-cream py-24 dark:bg-slate-950">
        <div className="mx-auto mb-14 flex max-w-7xl flex-col gap-6 px-6 md:px-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">Featured Courses</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
              지금 둘러보기 좋은 추천 강좌
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              최신 등록 강좌 중 대표 프로그램을 먼저 보여드립니다. 상세 페이지에서 수업 시간,
              대상 학년, 신청 가능 여부를 바로 확인할 수 있습니다.
            </p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-black text-primary">
            전체 강좌 보기
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-3">
          {loading
            ? [1, 2, 3].map((key) => (
                <div key={key} className="h-[420px] animate-pulse rounded-[2.5rem] bg-slate-200 dark:bg-slate-800" />
              ))
            : courses.map((course, index) => (
                <Link
                  key={course.id}
                  href={`/courses/detail?id=${course.id}`}
                  className="group overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/60 transition-all duration-300 hover:-translate-y-2 dark:bg-slate-900 dark:shadow-none"
                >
                  <div className="relative h-60 overflow-hidden">
                    <CourseImage
                      src={course.imageUrl || `/images/course${(index % 2) + 1}.png`}
                      alt={course.title}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-primary shadow-sm">
                      {course.category || '일반'}
                    </div>
                  </div>
                  <div className="space-y-4 p-8">
                    <h3 className="text-2xl font-black text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                      {course.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Schedule</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {course.schedule || '시간표 조율 중'}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">
                        arrow_right_alt
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-14 text-center md:px-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,162,97,0.35),_transparent_36%)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/80">Ready To Start</p>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
              우리 아이에게 맞는 방과후 시간을
              <br />
              더 쉽게 찾을 수 있습니다.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
              회원가입 후 신청 현황을 관리하고, 궁금한 내용은 문의 페이지에서 바로 남겨보세요.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-2xl bg-primary px-8 py-4 text-base font-black text-white shadow-xl shadow-primary/30 transition-all hover:brightness-110"
              >
                회원가입 시작하기
              </Link>
              <Link
                href="/faq"
                className="rounded-2xl border border-white/20 px-8 py-4 text-base font-black text-white transition-colors hover:bg-white/10"
              >
                자주 묻는 질문
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
