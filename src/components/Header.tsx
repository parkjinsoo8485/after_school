'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site';

export default function Header() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const authPages = ['/login', '/signup', '/forgot-password'];
  const hidePrimaryNav = authPages.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  const navLinks = [
    { name: '홈', href: '/' },
    { name: '강좌 목록', href: '/courses' },
    { name: '공지사항', href: '/notices' },
    { name: '강사진 소개', href: '/instructor' },
    { name: '문의', href: '/inquiry' },
  ];

  const headerTone = scrolled
    ? 'bg-white/95 py-3 shadow-sm backdrop-blur-md dark:bg-slate-900/95'
    : 'bg-white/80 py-3 backdrop-blur-md md:py-5 dark:bg-slate-900/80';
  const layoutClass = hidePrimaryNav
    ? 'mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 md:gap-6 md:px-10'
    : 'mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-3 px-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6 md:px-10';

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerTone}`}>
      <div className={layoutClass}>
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[20px] font-bold">school</span>
          </div>
          <span className="text-base font-black tracking-tighter text-slate-900 dark:text-white sm:text-lg">
            {siteConfig.shortName}
            <span className="text-primary"> 포털</span>
          </span>
        </Link>

        {!hidePrimaryNav ? (
          <nav className="hidden min-w-0 items-center justify-self-center overflow-x-auto rounded-2xl border border-white/20 bg-slate-100/70 p-1 backdrop-blur-sm md:flex dark:bg-slate-800/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                  pathname === link.href
                    ? 'bg-white text-primary shadow-sm dark:bg-slate-700'
                    : 'text-slate-500 hover:text-primary dark:text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/mypage"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined text-lg">account_circle</span>
                <span>{user.displayName || '마이페이지'}</span>
              </Link>
              <button
                onClick={() => logout()}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
                type="button"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:text-primary dark:text-slate-200"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95"
              >
                시작하기
              </Link>
            </>
          )}
        </div>

        {!hidePrimaryNav ? (
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        ) : null}
      </div>

      {!hidePrimaryNav && menuOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-5 pt-4 shadow-lg backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {user ? (
              <>
                <Link
                  href="/mypage"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white"
                  type="button"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-bold text-white"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
