import type { Course, Notice } from './db-service';

export const demoCourses: Course[] = [
  {
    id: 'demo-ai-story-lab',
    title: 'AI 스토리 메이커 랩',
    description:
      '생성형 AI와 글쓰기 활동을 결합해 나만의 짧은 이야기와 발표 자료를 만드는 창작형 수업입니다.',
    category: '언어/인문',
    status: 'active',
    schedule: '매주 수 15:10 - 16:30',
    targetGrade: '4~6학년',
    instructor: '정해봄 강사',
    imageUrl: '/images/course2.png',
  },
  {
    id: 'demo-junior-maker',
    title: '주니어 메이커 공작실',
    description:
      '생활 속 문제를 직접 설계하고 만들며 협업과 발표를 경험하는 프로젝트형 메이커 프로그램입니다.',
    category: 'IT/과학',
    status: 'active',
    schedule: '매주 목 14:20 - 15:50',
    targetGrade: '2~5학년',
    instructor: '한도윤 강사',
    imageUrl: '/images/course1.png',
  },
];

export const demoNotices: Notice[] = [
  {
    id: 'demo-notice-orientation',
    number: '125',
    title: '신규 프로그램 오리엔테이션 안내',
    date: '2026.03.08',
    content:
      '새로 개설된 프로그램은 첫 주에 간단한 오리엔테이션을 진행합니다. 준비물과 운영 방식은 첫 수업 전 다시 안내됩니다.',
    views: 98,
  },
];
