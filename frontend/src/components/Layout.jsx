import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      {mobileNavOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={styles.main}>
        <Navbar onMenuClick={() => setMobileNavOpen((v) => !v)} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
