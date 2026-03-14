import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-900/50 md:px-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 md:grid-cols-3">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">school</span>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            학생의 흥미를 진로와 성장으로 연결하는 지역 맞춤형 방과후 프로그램 안내 사이트입니다.
            <br />
            강좌 탐색부터 공지 확인, 문의 접수까지 한 번에 진행할 수 있습니다.
          </p>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-bold text-slate-900 dark:text-white">주요 서비스</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
            <li><Link className="transition-colors hover:text-primary" href="/courses">강좌 둘러보기</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/instructor">강사진 소개</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/notices">공지사항</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/inquiry">문의하기</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-bold text-slate-900 dark:text-white">고객 지원</h4>
          <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
            <li><Link className="transition-colors hover:text-primary" href="/faq">자주 묻는 질문</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/terms">이용약관</Link></li>
            <li><Link className="transition-colors hover:text-primary" href="/privacy">개인정보 처리방침</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-400 dark:border-slate-800 md:flex-row">
        <p>
          © 2026 {siteConfig.name}. 문의 {siteConfig.contactPhone} / {siteConfig.contactEmail}
        </p>
        <div className="flex gap-6 text-slate-400">
          <Link className="hover:text-primary" href="/privacy">
            <span className="material-symbols-outlined text-xl">policy</span>
          </Link>
          <Link className="hover:text-primary" href="/inquiry">
            <span className="material-symbols-outlined text-xl">alternate_email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
