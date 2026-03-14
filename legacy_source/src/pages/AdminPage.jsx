import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'users')).then((snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  return (
    <section className="page-wrap">
      <h1>관리자 운영</h1>
      <p className="page-desc">사용자 권한과 운영 현황을 확인합니다.</p>

      <div className="card-list">
        {users.map((u) => (
          <article key={u.id} className="card">
            <div className="row-between">
              <h3>{u.displayName || '이름 없음'}</h3>
              <span className={`status-chip ${u.role === 'admin' ? 'on' : 'off'}`}>
                {u.role || 'user'}
              </span>
            </div>
            <p>{u.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
