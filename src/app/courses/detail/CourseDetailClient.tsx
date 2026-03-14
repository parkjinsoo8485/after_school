'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Course } from '@/lib/db-service';
import { enrollCourse } from '@/lib/db-service';
import CourseImage from '@/components/CourseImage';

function fallbackImage(courseId?: string) {
  return courseId && courseId.length % 2 === 0 ? '/images/course2.png' : '/images/course1.png';
}

type CourseDetailClientProps = {
  course: Course | null;
};

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);

  async function handleEnroll() {
    if (!user) {
      alert('수강 신청을 하려면 먼저 로그인해 주세요.');
      router.push('/login');
      return;
    }

    if (!course) return;

    setEnrolling(true);
    try {
      await enrollCourse(course.id, user.uid, user.displayName || user.email || '사용자');
      alert('수강 신청이 접수되었습니다. 마이페이지에서 진행 상태를 확인할 수 있습니다.');
      router.push('/mypage');
    } catch (err) {
      console.error(err);
      alert('신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setEnrolling(false);
    }
  }

  if (!course) {
    return (
      <main className="flex-1 px-6 py-28">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
          <h1 className="mt-5 text-3xl font-black text-slate-900">강좌 정보를 찾을 수 없습니다</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            요청한 강좌가 삭제되었거나 주소가 변경되었을 수 있습니다. 강좌 목록에서 다시 확인해
            주세요.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white"
          >
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-24">
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="transition-colors hover:text-primary">홈</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/courses" className="transition-colors hover:text-primary">강좌 목록</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-slate-900">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-sm">
            <div className="relative h-[300px] md:h-[420px]">
              <CourseImage
                src={course.imageUrl || fallbackImage(course.id)}
                alt={course.title}
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5 p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  {course.category || '일반'}
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500">
                  {course.targetGrade || '대상 학년 별도 안내'}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-4 text-base leading-8 text-slate-600">{course.description}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-900">
                <span className="material-symbols-outlined text-primary">schedule</span>
                운영 정보
              </h2>
              <dl className="space-y-4 text-sm leading-7 text-slate-600">
                <div>
                  <dt className="font-black text-slate-900">수업 시간</dt>
                  <dd>{course.schedule || '세부 시간표는 공지사항 또는 개별 안내로 전달됩니다.'}</dd>
                </div>
                <div>
                  <dt className="font-black text-slate-900">담당 강사</dt>
                  <dd>{course.instructor || '운영 확정 후 담당 강사가 배정됩니다.'}</dd>
                </div>
                <div>
                  <dt className="font-black text-slate-900">신청 상태</dt>
                  <dd>{course.status === 'active' ? '현재 신청 가능합니다.' : '모집이 마감되었습니다.'}</dd>
                </div>
              </dl>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-900">
                <span className="material-symbols-outlined text-primary">info</span>
                신청 전 확인하세요
              </h2>
              <ul className="space-y-3 text-sm leading-7 text-slate-600">
                <li>운영 시간과 준비물은 학사 일정에 따라 일부 조정될 수 있습니다.</li>
                <li>신청 후 승인 여부는 마이페이지 또는 별도 안내로 확인할 수 있습니다.</li>
                <li>세부 문의가 필요하면 문의 페이지에서 학교명과 강좌명을 함께 남겨 주세요.</li>
              </ul>
            </article>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary/70">Enrollment</p>
            <div className="mt-4">
              <p className="text-sm text-slate-500">운영 기준</p>
              <p className="mt-1 text-3xl font-black text-slate-900">4주 단위 프로그램</p>
            </div>

            <div className="mt-8 space-y-4 border-y border-slate-100 py-6 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                <div>
                  <p className="font-black text-slate-900">추천 대상</p>
                  <p>{course.targetGrade || '상세 대상은 담당 학교 공지 기준을 따릅니다.'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <div>
                  <p className="font-black text-slate-900">신청 절차</p>
                  <p>로그인 후 신청 접수, 운영 확인 후 승인 안내</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnroll}
              disabled={enrolling || course.status !== 'active'}
              className="mt-8 w-full rounded-2xl bg-primary py-4 text-base font-black text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enrolling ? '신청 처리 중...' : course.status === 'active' ? '수강 신청하기' : '신청 마감'}
            </button>

            <Link
              href="/inquiry"
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-slate-200 py-4 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50"
            >
              문의 남기기
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
