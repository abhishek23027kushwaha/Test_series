import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FiTrash2 } from 'react-icons/fi';
import { colorForLabel } from '../questions/badgeColors';
import styles from './AdminPanel.module.css';

const difficultyClass = {
  Easy: styles.easy,
  Medium: styles.medium,
  Hard: styles.hard,
};

export default function AdminPanel() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    const res = await axiosInstance.get('/admin/users');
    setUsers(res.data);
    setIsLoading(false);
  };

  const loadQuestions = async () => {
    setIsLoading(true);
    const res = await axiosInstance.get('/admin/questions');
    setQuestions(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (tab === 'users') loadUsers();
    if (tab === 'questions') loadQuestions();
  }, [tab]);

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axiosInstance.delete(`/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const toggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    const res = await axiosInstance.put(`/admin/users/${u._id}/role`, { role: newRole });
    setUsers((prev) => prev.map((usr) => (usr._id === u._id ? res.data.user : usr)));
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await axiosInstance.delete(`/admin/questions/${id}`);
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const tabBtn = (key, label) => (
    <button
      className={`${styles.tabBtn} ${tab === key ? styles.tabBtnActive : ''}`}
      onClick={() => setTab(key)}
    >
      {label}
    </button>
  );

  const initials = (name = '') =>
    name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <div className="page-container">
      <div className={styles.header}>
        <h1>Admin Panel</h1>
        {tab === 'users' && !isLoading && <span className={styles.count}>{users.length} users</span>}
        {tab === 'questions' && !isLoading && (
          <span className={styles.count}>{questions.length} questions</span>
        )}
      </div>

      <div className={styles.tabs}>
        {tabBtn('users', 'Manage Users')}
        {tabBtn('questions', 'Manage Questions')}
      </div>

      {isLoading && <p>Loading...</p>}

      {tab === 'users' && !isLoading && (
        <div className={`card ${styles.tableWrap}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>{initials(u.name)}</div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`${styles.roleBadge} ${
                        u.role === 'admin' ? styles.roleAdmin : styles.roleUser
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button className={styles.iconBtn} onClick={() => toggleRole(u)}>
                        {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                      </button>
                      <button className={styles.dangerBtn} onClick={() => deleteUser(u._id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className={styles.empty}>No users found.</div>}
        </div>
      )}

      {tab === 'questions' && !isLoading && (
        <div className={styles.grid}>
          {questions.map((q) => {
            const subjectColor = colorForLabel(q.subject);
            const companyColor = colorForLabel(q.company || 'Others');
            return (
              <div key={q._id} className={`card ${styles.qCard}`}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className={styles.qTitle}>{q.title}</h3>
                  <div className={styles.badgeRow}>
                    {q.difficulty && (
                      <span className={`${styles.badge} ${difficultyClass[q.difficulty] || ''}`}>
                        {q.difficulty}
                      </span>
                    )}
                    {q.subject && (
                      <span
                        className={styles.badge}
                        style={{ background: subjectColor.bg, color: subjectColor.fg }}
                      >
                        {q.subject}
                      </span>
                    )}
                    {q.company && (
                      <span
                        className={styles.badge}
                        style={{ background: companyColor.bg, color: companyColor.fg }}
                      >
                        {q.company}
                      </span>
                    )}
                  </div>
                </div>
                <button className={styles.deleteBtn} onClick={() => deleteQuestion(q._id)}>
                  <FiTrash2 />
                </button>
              </div>
            );
          })}
          {questions.length === 0 && <div className={`card ${styles.empty}`}>No questions found.</div>}
        </div>
      )}
    </div>
  );
}
