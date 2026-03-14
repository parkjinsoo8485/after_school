import type { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '로그인',
  description: '수강 신청과 신청 현황 확인을 위해 계정으로 로그인하세요.',
  path: '/login',
});

export default function LoginPage() {
  return <LoginPageClient />;
}
