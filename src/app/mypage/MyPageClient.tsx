'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Enrollment, getCourses, getEnrollmentsByUserId } from '@/lib/db-service';

type EnrollmentWithCourse = Enrollment & {
  courseTitle: string;
};

function formatStatus(status: Enrollment['status']) {
  if (status === 'pending') {
    return {
      label: '승인 대기',
      className: 'bg-yellow-100 text-yellow-700',
    };
  }

  if (status === 'approved') {
    return {
      label: '승인 완료',
      className: 'bg-emerald-100 text-emerald-700',
    };
  }

  if (status === 'completed') {
    return {
      label: '수강 완료',
      className: 'bg-blue-100 text-blue-700',
    };
  }

  return {
    label: '처리 중',
    className: 'bg-slate-200 text-slate-600',
  };
}

export default function MyPageClient() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const currentUser = user;

    async function fetchDashboardData() {
      try {
        const [enrollmentData, courses] = await Promise.all([
          getEnrollmentsByUserId(currentUser.uid),
          getCourses(),
        ]);

        const courseMap = new Map(courses.map((course) => [course.id, course.title]));
        const enriched = enrollmentData.map((enrollment) => ({
          ...enrollment,
          courseTitle: courseMap.get(enrollment.courseId) || `강좌 ${enrollment.courseId}`,
        }));

        setEnrollments(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  const pendingCount = useMemo(
    () => enrollments.filter((item) => item.status === 'pending').length,
    [enrollments],
  );
  const approvedCount = useMemo(
    () => enrollments.filter((item) => item.status === 'approved' || item.status === 'completed').length,
    [enrollments],
  );

  if (authLoading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex-1 bg-slate-50 px-4 py-8 dark:bg-slate-900/50 lg:px-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
              </div>
              <h2 className="text-lg font-bold">{user.displayName || user.email}</h2>
              <p className="text-sm text-slate-500">학생 회원</p>
            </div>

            <nav className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 text-left font-medium text-white">
                <span className="material-symbols-outlined">dashboard</span>
                <span>신청 현황</span>
              </button>
              <Link
                href="/courses"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined">school</span>
                <span>강좌 더 보기</span>
              </Link>
            </nav>

            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
              <button
                onClick={() => logout()}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-9">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-1 text-sm font-medium text-slate-500">전체 신청 강좌</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-primary">
                  {enrollments.length}
                  <span className="ml-1 text-lg font-normal text-slate-400">건</span>
                </h3>
                <span className="material-symbols-outlined text-4xl text-primary/20">school</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-1 text-sm font-medium text-slate-500">승인 대기</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-amber-500">
                  {pendingCount}
                  <span className="ml-1 text-lg font-normal text-slate-400">건</span>
                </h3>
                <span className="material-symbols-outlined text-4xl text-amber-200">schedule</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-1 text-sm font-medium text-slate-500">승인 완료</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-emerald-600">
                  {approvedCount}
                  <span className="ml-1 text-lg font-normal text-slate-400">건</span>
                </h3>
                <span className="material-symbols-outlined text-4xl text-emerald-200">verified</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">수강 신청 현황</h2>
            <div className="space-y-3">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500">신청 내역을 불러오는 중입니다...</p>
                </div>
              ) : enrollments.length > 0 ? (
                enrollments.map((enrollment) => {
                  const status = formatStatus(enrollment.status);

                  return (
                    <div
                      key={enrollment.id}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex size-16 items-center justify-center rounded-xl bg-blue-50 text-primary dark:bg-blue-900/20">
                        <span className="material-symbols-outlined text-3xl">school</span>
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${status.className}`}>
                            {status.label}
                          </span>
                          <h3 className="text-sm font-bold">{enrollment.courseTitle}</h3>
                        </div>
                        <p className="text-xs text-slate-500">
                          신청일:{' '}
                          {enrollment.createdAt?.toDate
                            ? enrollment.createdAt.toDate().toLocaleDateString()
                            : '최근'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500">아직 신청한 강좌가 없습니다.</p>
                  <Link href="/courses" className="mt-2 inline-block text-xs font-bold text-primary">
                    강좌 둘러보기 →
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
