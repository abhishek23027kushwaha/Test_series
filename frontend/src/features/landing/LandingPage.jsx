import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiLayers, FiBookOpen, FiClipboard, FiBookmark, FiArrowRight, FiCheckCircle,
} from 'react-icons/fi';
import styles from './Landing.module.css';

const FEATURES = [
  {
    icon: FiLayers,
    title: 'Broad Curriculum',
    text: 'Core subjects spanning JavaScript to Spring Boot',
  },
  {
    icon: FiBookOpen,
    title: 'Expert Answers',
    text: 'Curated interview questions with detailed answers',
  },
  {
    icon: FiClipboard,
    title: 'Mock Tests',
    text: 'Timed tests that mirror real interview pressure',
  },
  {
    icon: FiBookmark,
    title: 'Smart Bookmarks',
    text: 'Save tough questions and revisit them anytime',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.blobOne} />
      <div className={styles.blobTwo} />

      <div className={styles.hero}>
        <div className={styles.copy}>
 <div className={styles.brandRow}>
  <div className={styles.logo}>
    <img
      src="/prepportal-logo.png"
      alt="PrepPortal - Technical Interview Preparation"
      className={styles.logoImage}
    />
  </div>

  <div className={styles.badge}>
    <FiCheckCircle size={14} />
    Trusted by developers preparing for interviews
  </div>
</div>

          <h1 className={styles.title}>
            Ace your next <span className={styles.titleAccent}>tech interview</span>,
            one question at a time.
          </h1>
          <p className={styles.tagline}>
            A focused prep space for developers — practice real interview questions,
            take mock tests, and track your progress across every major web technology.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={`btn secondary ${styles.actionBtn} ${styles.loginBtn}`}
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
            <button
              type="button"
              className={`btn ${styles.actionBtn}`}
              onClick={() => navigate('/register')}
            >
              Sign Up Free <FiArrowRight />
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>10+</div>
              <div className={styles.statLabel}>Subjects</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statValue}>400+</div>
              <div className={styles.statLabel}>Questions</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statValue}>Free</div>
              <div className={styles.statLabel}>Forever</div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageWrap}>
            <img
              src="/dashboard-illustration2.png"
              alt="Prep Portal dashboard preview"
              className={styles.image}
            />
          </div>

          {FEATURES.slice(0, 2).map(({ icon: Icon, title }, i) => (
            <div
              key={title}
              className={`${styles.floatCard} ${i === 0 ? styles.floatCardTop : styles.floatCardBottom}`}
            >
              <span className={styles.floatIcon}><Icon size={16} /></span>
              {title}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.featureStrip}>
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className={styles.featureCard}>
            <span className={styles.featureIcon}><Icon size={18} /></span>
            <span className={styles.featureCopy}>
              <span className={styles.featureTitle}>{title}</span>
              <span className={styles.featureText}>{text}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
