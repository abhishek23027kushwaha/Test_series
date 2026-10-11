import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiHome,
  FiBookOpen,
  FiLayers,
  FiClipboard,
  FiBookmark,
  FiUser,
  FiShield,
  FiZap,
} from 'react-icons/fi';
import LogoMark from './LogoMark';
import styles from './Sidebar.module.css';

const userLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/questions', label: 'Questions', icon: FiBookOpen },
  { to: '/subjects', label: 'Subjects', icon: FiLayers },
  { to: '/mocktest', label: 'Mock Test', icon: FiClipboard },
  { to: '/bookmarks', label: 'Bookmarks', icon: FiBookmark },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

const adminLinks = [
  { to: '/admin', label: 'Admin', icon: FiShield, end: true },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';
  const links = isAdmin ? adminLinks : userLinks;
  const homePath = isAdmin ? '/admin' : '/dashboard';

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.sidebarLines} aria-hidden="true">
        <span className={styles.sidebarLine} />
        <span className={styles.sidebarLine} />
        <span className={styles.sidebarLine} />
      </div>

   <NavLink to={homePath} className={styles.logo} onClick={onClose}>
  <div className={styles.logoBox}>
    <img
      src="/prepportal-logo.png"
      alt="PrepPortal Logo"
      className={styles.logoImage}
    />
  </div>
</NavLink>
      {links.map(({ to, label, icon: Icon, end }, i) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClose}
          style={{ animationDelay: `${0.05 * i}s` }}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          <Icon className={styles.linkIcon} /> {label}
        </NavLink>
      ))}

      <div className={styles.spacer} />

      <div className={styles.promo}>
        <div className={styles.promoIcon}>
          <FiZap />
        </div>
        <div className={styles.promoText}>Keep Going!</div>
      </div>
    </div>
  );
}
