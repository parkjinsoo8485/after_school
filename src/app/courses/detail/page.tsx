import type { Metadata } from 'next';
import { Suspense } from 'react';
import CourseDetailClient from './CourseDetailClient';
import { buildMetadata } from '@/lib/site';
import { getPublicCourseById } from '@/lib/public-data';

export const metadata: Metadata = buildMetadata({
  title: '강좌 상세',
  description: '방과후학교 강좌의 시간표, 대상 학년, 강사 정보와 수강 신청 흐름을 확인할 수 있습니다.',
  path: '/courses/detail',
});

export const dynamic = 'force-dynamic';

export default async function CourseDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const course = id ? await getPublicCourseById(id) : null;

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      }
    >
      <CourseDetailClient course={course} />
    </Suspense>
  );
}
