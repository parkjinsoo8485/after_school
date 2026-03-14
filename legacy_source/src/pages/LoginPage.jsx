import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const onSocialClick = (provider) => {
    setError(`${provider} 로그인은 아직 연결되지 않았습니다.`);
  };

  return (
    <div className="center-screen">
      <header className="login-nav card" style={{ marginBottom: 12 }}>
        <nav style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard">프로그램 안내</Link>
          <Link to="/data">수강신청</Link>
          <Link to="/dashboard">공지사항</Link>
          <Link to="/login">회원가입</Link>
        </nav>
      </header>

      <form className="card" onSubmit={onSubmit} style={{ minWidth: 320, maxWidth: 440, width: '100%' }}>
        <h1>로그인</h1>
        <input
          type="email"
          placeholder="아이디(이메일)"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14 }}>
          <Link to="/profile">아이디 찾기</Link>
          <Link to="/profile">비밀번호 찾기</Link>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button type="button" onClick={() => onSocialClick('카카오')}>
            카카오 로그인
          </button>
          <button type="button" onClick={() => onSocialClick('네이버')}>
            네이버 로그인
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14 }}>
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
        </div>
      </form>
    </div>
  );
}
