import { signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export default function AppLayout({ children }) {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="app-shell">
      <header className="topbar stitch-header">
        <div className="brand">
          <span className="brand-mark" />
          <strong>방과후 프로그램</strong>
        </div>
        <nav className="top-nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            프로그램 안내
          </NavLink>
          <NavLink to="/data" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            수강신청
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            마이페이지
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              관리자
            </NavLink>
          )}
        </nav>
        <div className="topbar-user">
          <div>
            <strong>{profile?.displayName || '회원'}</strong>
            <small>{profile?.role || 'user'}</small>
          </div>
          <button onClick={() => signOut(auth)}>로그아웃</button>
        </div>
      </header>
      <main className="content">
        {children}
      </main>
    </div>
  );
}
