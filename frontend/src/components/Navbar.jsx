import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogOut, FiSearch, FiMenu } from 'react-icons/fi';
import { logout } from '../features/auth/authSlice';
import styles from './Navbar.module.css';

export default function Navbar({ onMenuClick = () => {} }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/questions?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const initials = user?.name
    ?.split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.navbar}>
      <button
        type="button"
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <FiMenu />
      </button>
      <form className={styles.searchWrap} onSubmit={handleSearch}>
        <FiSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search questions, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className={styles.right}>
        <Link to="/profile" className={styles.profileLink}>
          <span className={styles.avatar}>{initials || '?'}</span>
          <span className={styles.profileName}>{user?.name}</span>
        </Link>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
