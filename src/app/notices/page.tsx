import type { Metadata } from 'next';
import NoticesPageClient from './NoticesPageClient';
import { buildMetadata } from '@/lib/site';
import { getPublicNotices } from '@/lib/public-data';

export const metadata: Metadata = buildMetadata({
  title: '공지사항',
  description: '운영 일정, 준비물, 장소 변경, 신청 일정 등 공지 내용을 확인할 수 있습니다.',
  path: '/notices',
});

export const dynamic = 'force-dynamic';

export default async function NoticesPage() {
  const notices = await getPublicNotices();
  return <NoticesPageClient initialNotices={notices} />;
}
