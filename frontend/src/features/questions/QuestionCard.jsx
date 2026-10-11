import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiBookmark, FiCheckCircle, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { toggleSolved, toggleBookmark, deleteQuestion, openForm } from './questionSlice';
import { colorForLabel } from './badgeColors';
import styles from './Questions.module.css';

const difficultyClass = {
  Easy: styles.easy,
  Medium: styles.medium,
  Hard: styles.hard,
};

export default function QuestionCard({ question }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookmarkedIds } = useSelector((state) => state.questions);
  const [showAnswer, setShowAnswer] = useState(false);

  const isBookmarked = bookmarkedIds.includes(question._id);
  const isOwner = user && (question.createdBy === user._id || question.createdBy?._id === user._id);
  const canEdit = isOwner || user?.role === 'admin';
  const subjectColor = colorForLabel(question.subject);
  const companyColor = colorForLabel(question.company || 'Others');

  return (
    <div className={`card ${styles.questionCard}`}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 className={styles.qTitle}>{question.title}</h3>
        {question.description && <p className={styles.qDesc}>{question.description}</p>}
        <div className={styles.badgeRow}>
          <span className={`${styles.badge} ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span>
          <span
            className={styles.badge}
            style={{ background: subjectColor.bg, color: subjectColor.fg }}
          >
            {question.subject}
          </span>
          {question.company && (
            <span
              className={styles.badge}
              style={{ background: companyColor.bg, color: companyColor.fg }}
            >
              {question.company}
            </span>
          )}
        </div>

        {question.answer && (
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => setShowAnswer((s) => !s)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: 0,
              }}
            >
              {showAnswer ? <FiChevronUp /> : <FiChevronDown />}
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && (
              <div
                style={{
                  marginTop: 8,
                  background: 'var(--surface-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 14,
                  color: 'var(--text)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {question.answer}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.iconBtn} ${question.solvedByMe ? styles.solvedActive : ''}`}
          onClick={() => dispatch(toggleSolved(question._id))}
        >
<FiCheckCircle />
{question.solvedByMe ? 'Reviewed' : 'Mark as Reviewed'}        </button>
        <button
          className={`${styles.iconBtn} ${isBookmarked ? styles.bookmarkActive : ''}`}
          onClick={() => dispatch(toggleBookmark(question))}
        >
          <FiBookmark style={isBookmarked ? { fill: 'currentColor' } : undefined} />{' '}
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        {canEdit && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button className={styles.iconBtn} onClick={() => dispatch(openForm(question))}>
              <FiEdit2 />
            </button>
            <button
              className={styles.iconBtn}
              onClick={() => {
                if (window.confirm('Delete this question?')) dispatch(deleteQuestion(question._id));
              }}
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
