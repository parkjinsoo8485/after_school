import type { Metadata } from 'next';
import CoursesPageClient from './CoursesPageClient';
import { buildMetadata } from '@/lib/site';
import { getPublicCourses } from '@/lib/public-data';

export const metadata: Metadata = buildMetadata({
  title: '강좌 목록',
  description: '카테고리와 검색어로 방과후학교 강좌를 탐색하고, 상세 정보와 신청 가능 여부를 확인하세요.',
  path: '/courses',
});

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await getPublicCourses();
  return <CoursesPageClient initialCourses={courses} />;
}
