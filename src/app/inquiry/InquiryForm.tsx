'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('수강 신청');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) {
      alert('모든 필수 항목을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name,
        email,
        category,
        content,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      alert('문의가 성공적으로 접수되었습니다. 담당자가 확인 후 답변 드릴 예정입니다.');
      setName('');
      setEmail('');
      setCategory('수강 신청');
      setContent('');
      router.push('/');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-700">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="답변 받을 분의 이름을 입력해 주세요"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-700">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="연락 가능한 이메일 주소를 입력해 주세요"
        />
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-sm font-bold text-slate-700">문의 유형</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        >
          <option>수강 신청</option>
          <option>결제 및 환불</option>
          <option>강좌 운영</option>
          <option>계정 및 로그인</option>
          <option>기타</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-bold text-slate-700">문의 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="h-40 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="확인하고 싶은 내용을 자세히 적어 주세요"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '접수 중...' : '문의 접수하기'}
      </button>
    </form>
  );
}
