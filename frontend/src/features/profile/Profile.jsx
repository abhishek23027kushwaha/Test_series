import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiCheck, FiX, FiLock, FiBookmark, FiAward, FiCalendar } from 'react-icons/fi';
import { updateProfile, clearProfileStatus } from './profileSlice';
import { fetchBookmarks } from '../questions/questionSlice';
import styles from './Profile.module.css';

const FIELDS = [
  { key: 'name', label: 'Full Name', type: 'input', placeholder: 'Your full name' },
  { key: 'bio', label: 'Bio', type: 'textarea', rows: 3, placeholder: 'Tell us a bit about yourself...' },
  { key: 'skills', label: 'Skills', type: 'input', placeholder: 'HTML, CSS, JavaScript, MERN Stack' },
  { key: 'experience', label: 'Experience', type: 'textarea', rows: 3, placeholder: 'e.g. Fresher, 1 year in web development...' },
  { key: 'college', label: 'Institute Name', type: 'input', placeholder: 'Your college / institute' },
];

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, success } = useSelector((state) => state.profile);
  const { bookmarkedQuestions } = useSelector((state) => state.questions);

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    skills: (user?.skills || []).join(', '),
    college: user?.college || '',
    experience: user?.experience || '',
    photo: user?.photo || '',
  });
  const [editingField, setEditingField] = useState(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => dispatch(clearProfileStatus()), 2500);
      return () => clearTimeout(t);
    }
  }, [success, dispatch]);

  const startEdit = (key) => {
    dispatch(clearProfileStatus());
    setDraft(form[key]);
    setEditingField(key);
  };

  const cancelEdit = () => setEditingField(null);

  const saveField = (key) => {
    const updated = { ...form, [key]: draft };
    setForm(updated);
    dispatch(updateProfile(updated)).then((res) => {
      if (res.payload) {
        localStorage.setItem('user', JSON.stringify(res.payload));
      }
    });
    setEditingField(null);
  };

  const initial = (form.name || user?.email || 'U')[0].toUpperCase();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    : '—';
  const skillCount = form.skills ? form.skills.split(',').map((s) => s.trim()).filter(Boolean).length : 0;

  return (
    <div className={`page-container ${styles.page}`}>
      <h1>My Profile</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: -8 }}>
        Manage your personal details and how they appear across the portal.
      </p>

      {success && <div className={styles.toast}>Profile updated successfully!</div>}
      {error && <p className="error-text">{error}</p>}

      <div className={`card ${styles.card}`}>
        <div className={styles.header}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {form.photo ? <img src={form.photo} alt="avatar" /> : initial}
            </div>
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.headerName}>{form.name || 'Your Name'}</div>
            <span className={styles.headerRole}>{user?.role || 'user'}</span>
          </div>
        </div>

        {FIELDS.map(({ key, label, type, rows, placeholder }) => {
          const isEditing = editingField === key;
          return (
            <div className={styles.field} key={key}>
              <div className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {!isEditing ? (
                  <button type="button" className={styles.editBtn} onClick={() => startEdit(key)}>
                    <FiEdit2 size={13} /> Edit
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" className={styles.saveBtn} onClick={() => saveField(key)} disabled={isLoading}>
                      <FiCheck size={13} /> {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" className={styles.editBtn} onClick={cancelEdit}>
                      <FiX size={13} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                type === 'textarea' ? (
                  <textarea
                    className={styles.textarea}
                    rows={rows}
                    value={draft}
                    placeholder={placeholder}
                    autoFocus
                    onChange={(e) => setDraft(e.target.value)}
                  />
                ) : (
                  <input
                    className={styles.input}
                    value={draft}
                    placeholder={placeholder}
                    autoFocus
                    onChange={(e) => setDraft(e.target.value)}
                  />
                )
              ) : (
                <div className={`${styles.valueBox} ${!form[key] ? styles.empty : ''}`}>
                  {form[key] || `No ${label.toLowerCase()} added yet`}
                </div>
              )}
            </div>
          );
        })}

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Mail ID</span>
            <span className={styles.locked}>
              <FiLock size={11} /> Locked
            </span>
          </div>
          <div className={styles.valueBox}>{user?.email}</div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiBookmark />
            </div>
            <div>
              <div className={styles.statValue}>{bookmarkedQuestions?.length || 0}</div>
              <div className={styles.statLabel}>Bookmarks</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiAward />
            </div>
            <div>
              <div className={styles.statValue}>{skillCount}</div>
              <div className={styles.statLabel}>Skills Listed</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiCalendar />
            </div>
            <div>
              <div className={styles.statValue}>{memberSince}</div>
              <div className={styles.statLabel}>Member Since</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
