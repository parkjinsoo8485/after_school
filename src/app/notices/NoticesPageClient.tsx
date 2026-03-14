'use client';

import type { Notice } from '@/lib/db-service';
import Link from 'next/link';
import { useState } from 'react';

type NoticesPageClientProps = {
  initialNotices: Notice[];
};

export default function NoticesPageClient({ initialNotices }: NoticesPageClientProps) {
  const [notices] = useState<Notice[]>(initialNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 md:pt-36">
      <div className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">홈</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">공지사항</span>
        </nav>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">Notice</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 dark:text-white">공지사항</h1>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              운영 일정, 준비물, 장소 변경, 신청 일정처럼 학부모가 자주 확인하는 내용을 정리합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="w-20 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">번호</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">제목</th>
                <th className="w-32 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">작성일</th>
                <th className="w-24 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">조회수</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400">
                    공지사항을 불러오는 중입니다...
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <td className="px-6 py-4 text-center text-sm font-medium text-slate-500">{notice.number}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900 transition-colors group-hover:text-primary dark:text-slate-200">
                        {notice.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-slate-500">{notice.date}</td>
                    <td className="px-6 py-4 text-center text-sm text-slate-500">{notice.views || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedNotice(null)}
          />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-8 py-5 dark:border-slate-700 dark:bg-slate-800">
              <div>
                <p className="mb-1 text-xs text-slate-400">공지 #{selectedNotice.number}</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedNotice.title}</h2>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                type="button"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <div className="flex items-center gap-6 border-b border-slate-100 px-8 py-4 text-sm text-slate-500 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {selectedNotice.date}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">person</span>
                운영팀
              </span>
            </div>
            <div className="min-h-[160px] px-8 py-8 leading-relaxed text-slate-700 dark:text-slate-300">
              {selectedNotice.content}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-8 py-5 dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => setSelectedNotice(null)}
                className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium transition-all hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700"
                type="button"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
