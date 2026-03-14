import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="center-screen">
      <div className="card">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <Link to="/dashboard">Go Dashboard</Link>
      </div>
    </div>
  );
}