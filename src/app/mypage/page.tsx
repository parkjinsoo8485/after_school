import type { Metadata } from 'next';
import MyPageClient from './MyPageClient';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '마이페이지',
  description: '수강 신청 현황과 승인 상태를 확인할 수 있습니다.',
  path: '/mypage',
});

export default function MyPage() {
  return <MyPageClient />;
}
