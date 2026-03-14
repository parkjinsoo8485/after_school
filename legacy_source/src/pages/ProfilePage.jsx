import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, profile } = useAuth();

  return (
    <section className="page-wrap">
      <h1>마이페이지</h1>
      <p className="page-desc">내 계정 정보와 권한 상태를 확인할 수 있습니다.</p>

      <div className="grid-cards">
        <article className="stat-card">
          <h3>이메일</h3>
          <p>{user?.email || '-'}</p>
        </article>
        <article className="stat-card">
          <h3>이름</h3>
          <p>{profile?.displayName || '-'}</p>
        </article>
        <article className="stat-card">
          <h3>권한</h3>
          <p>{profile?.role || 'user'}</p>
        </article>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>안내</h3>
        <p>아이디/비밀번호 찾기 등 계정 문의는 운영팀으로 요청해 주세요.</p>
      </div>
    </section>
  );
}
