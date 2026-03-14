'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Course } from '@/lib/db-service';
import PageIntro from '@/components/PageIntro';
import CourseImage from '@/components/CourseImage';

const categories = ['전체', 'IT/과학', '예술/문화', '스포츠', '언어/인문', '기타'];

function normalizeCategory(category?: string) {
  if (!category) return '기타';
  if (category.includes('IT') || category.includes('과학')) return 'IT/과학';
  if (category.includes('예술') || category.includes('문화')) return '예술/문화';
  if (category.includes('스포츠') || category.includes('체육')) return '스포츠';
  if (category.includes('언어') || category.includes('인문')) return '언어/인문';
  return category;
}

type CoursesPageClientProps = {
  initialCourses: Course[];
};

export default function CoursesPageClient({ initialCourses }: CoursesPageClientProps) {
  const [courses] = useState<Course[]>(initialCourses);
  const [loading] = useState(initialCourses.length === 0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const category = normalizeCategory(course.category);
      const matchedCategory = selectedCategory === '전체' || category === selectedCategory;
      const keyword = search.trim().toLowerCase();
      const matchedSearch =
        !keyword ||
        course.title.toLowerCase().includes(keyword) ||
        course.description.toLowerCase().includes(keyword) ||
        category.toLowerCase().includes(keyword);

      return matchedCategory && matchedSearch;
    });
  }, [courses, search, selectedCategory]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#fffdf9_0%,_#ffffff_28%,_#f8fafc_100%)] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2.75rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur md:p-12">
          <PageIntro
            icon="school"
            eyebrow="Programs"
            title="우리 아이에게 맞는 강좌를 찾아보세요"
            description="카테고리와 검색어로 강좌를 빠르게 좁혀볼 수 있습니다. 강좌 상세 페이지에서 시간표, 대상 학년, 신청 가능 여부를 확인하세요."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="예: 로봇, 코딩, 댄스, 영어"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-2xl px-5 py-4 text-sm font-black transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((key) => (
                <div key={key} className="h-[420px] animate-pulse rounded-[2.5rem] bg-slate-200" />
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course, index) => {
                const category = normalizeCategory(course.category);

                return (
                  <Link
                    key={course.id}
                    href={`/courses/detail?id=${course.id}`}
                    className="group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <CourseImage
                        src={course.imageUrl || `/images/course${(index % 2) + 1}.png`}
                        alt={course.title}
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
                        {category}
                      </div>
                    </div>

                    <div className="space-y-4 p-7">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-black ${
                            course.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {course.status === 'active' ? '모집중' : '마감'}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {course.targetGrade || '대상 학년 별도 안내'}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-black text-slate-900 transition-colors group-hover:text-primary">
                          {course.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Schedule</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {course.schedule || '운영 시간 조율 중'}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
              <h2 className="mt-5 text-2xl font-black text-slate-900">조건에 맞는 강좌가 아직 없습니다</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                검색어를 바꾸거나 전체 카테고리로 다시 확인해 보세요. 원하는 프로그램이 없다면
                문의 페이지에서 운영 희망 분야를 남길 수 있습니다.
              </p>
              <Link
                href="/inquiry"
                className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white"
              >
                운영 문의 남기기
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
