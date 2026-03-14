import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDashboardStats } from '../services/userService';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalItems: 0, totalUsers: 0, activeItems: 0 });

  useEffect(() => {
    if (!user) return;
    getDashboardStats(user.uid).then(setStats);
  }, [user]);

  return (
    <section className="page-wrap">
      <h1>프로그램 안내</h1>
      <p className="page-desc">방과후 프로그램 핵심 지표와 최근 운영 상태를 확인하세요.</p>
      <div className="grid-cards">
        <article className="stat-card">
          <h3>내 신청 건수</h3>
          <strong>{stats.totalItems}</strong>
        </article>
        <article className="stat-card">
          <h3>진행 중 프로그램</h3>
          <strong>{stats.activeItems}</strong>
        </article>
        <article className="stat-card">
          <h3>전체 사용자</h3>
          <strong>{stats.totalUsers}</strong>
        </article>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>공지</h3>
        <p>신학기 수강신청은 매주 월요일 오전 10시에 오픈됩니다.</p>
      </div>
    </section>
  );
}
