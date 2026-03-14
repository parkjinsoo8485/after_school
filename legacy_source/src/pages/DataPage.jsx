import { useEffect, useState } from 'react';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { createItem, editItem, listItems, removeItem } from '../services/dataService';

const initialForm = { title: '', description: '', status: 'active' };

export default function DataPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    if (!user) return;
    const result = await listItems(user.uid);
    setItems(result);
  };

  useEffect(() => {
    load();
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (editingId) {
      await editItem(editingId, form);
    } else {
      await createItem(form, user.uid);
    }

    setForm(initialForm);
    setEditingId(null);
    await load();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      status: item.status,
    });
  };

  const onDelete = async (id) => {
    await removeItem(id);
    await load();
  };

  return (
    <section className="page-wrap">
      <h1>수강신청</h1>
      <p className="page-desc">원하는 강좌를 추가하고 상태를 관리하세요.</p>

      <form className="card" onSubmit={submit}>
        <input
          placeholder="강좌명"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
        <textarea
          placeholder="강좌 설명"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option value="active">신청 가능</option>
          <option value="archived">마감</option>
        </select>
        <button type="submit">{editingId ? '수정 완료' : '신청 항목 추가'}</button>
      </form>

      {items.length === 0 ? (
        <EmptyState title="신청 내역이 없습니다" description="첫 수강신청 항목을 추가해 주세요." />
      ) : (
        <div className="card-list">
          {items.map((item) => (
            <article key={item.id} className="card">
              <div className="row-between">
                <h3>{item.title}</h3>
                <span className={`status-chip ${item.status === 'active' ? 'on' : 'off'}`}>
                  {item.status === 'active' ? '신청 가능' : '마감'}
                </span>
              </div>
              <p>{item.description}</p>
              <div className="row-actions">
                <button onClick={() => startEdit(item)}>수정</button>
                <button className="danger" onClick={() => onDelete(item.id)}>
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
