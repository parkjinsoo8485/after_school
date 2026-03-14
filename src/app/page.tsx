import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { buildMetadata } from '@/lib/site';
import { getPublicCourses } from '@/lib/public-data';

export const metadata: Metadata = buildMetadata({
  title: '방과후학교 안내센터',
  description:
    '강좌 탐색, 수강 신청, 공지 확인, 문의 접수를 한 곳에서 진행할 수 있는 방과후학교 안내 사이트입니다.',
  path: '/',
});

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const courses = await getPublicCourses();
  return <HomePageClient initialCourses={courses.slice(0, 3)} />;
}
