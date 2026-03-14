import type { Metadata } from 'next';
import SignupPageClient from './SignupPageClient';
import { buildMetadata } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: '회원가입',
  description: '학생 정보를 등록하고 수강 신청과 신청 현황 확인을 위한 계정을 생성하세요.',
  path: '/signup',
});

export default function SignupPage() {
  return <SignupPageClient />;
}
