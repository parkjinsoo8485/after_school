import type { Metadata } from 'next';

export const siteConfig = {
  name: '방과후학교 안내센터',
  shortName: '방과후학교',
  description:
    '학생의 흥미와 성장을 연결하는 방과후학교 프로그램 안내 사이트입니다. 강좌 탐색, 수강 신청, 공지 확인, 문의 접수를 한 곳에서 진행할 수 있습니다.',
  url: 'https://afterschool-74294.web.app',
  contactEmail: 'support@afterschool.local',
  contactPhone: '02-6000-7429',
};

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path = '',
}: MetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path || '/',
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
