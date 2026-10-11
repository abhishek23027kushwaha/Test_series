import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiBookmark, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { toggleSolved, toggleBookmark } from '../questions/questionSlice';
import { colorForLabel } from '../questions/badgeColors';
import questionStyles from '../questions/Questions.module.css';
import styles from './Bookmarks.module.css';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
const difficultyClass = {
  Easy: questionStyles.easy,
  Medium: questionStyles.medium,
  Hard: questionStyles.hard,
};

export default function BookmarkCard({ question, index, total }) {
  const dispatch = useDispatch();
  const [showAnswer, setShowAnswer] = useState(false);
  const hasOptions = Array.isArray(question.options) && question.options.length > 0;
  const subjectColor = colorForLabel(question.subject);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.indexLabel}>
          Question {index} of {total}
        </span>
        <button
          type="button"
          className={styles.removeBtn}
          title="Remove bookmark"
          onClick={() => dispatch(toggleBookmark(question))}
        >
          <FiBookmark style={{ fill: 'currentColor' }} />
        </button>
      </div>

      <h3 className={styles.title}>{question.title}</h3>
      {question.description && <p className={styles.desc}>{question.description}</p>}

      <div className={styles.badgeRow}>
        <span className={`${styles.badge} ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span>
        <span className={styles.badge} style={{ background: subjectColor.bg, color: subjectColor.fg }}>
          {question.subject}
        </span>
        {question.company && <span className={`${styles.badge} ${styles.companyBadge}`}>{question.company}</span>}
      </div>

      {hasOptions ? (
        <div className={styles.optionList}>
          {question.options.map((opt, idx) => {
            const isCorrect = question.correctOption === idx;
            return (
              <div key={idx} className={`${styles.option} ${isCorrect ? styles.optionCorrect : ''}`}>
                <span className={styles.optionLabel}>{OPTION_LABELS[idx] || idx + 1}</span>
                <span className={styles.optionText}>{opt}</span>
              </div>
            );
          })}
        </div>
      ) : (
        question.answer && (
          <div className={styles.answerBlock}>
            <button type="button" className={styles.answerToggle} onClick={() => setShowAnswer((s) => !s)}>
              {showAnswer ? <FiChevronUp /> : <FiChevronDown />}
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && <div className={styles.answerText}>{question.answer}</div>}
          </div>
        )
      )}

      <div className={styles.cardFooter}>
        <button
          type="button"
          className={`${styles.solvedBtn} ${question.solvedByMe ? styles.solvedActive : ''}`}
          onClick={() => dispatch(toggleSolved(question._id))}
        >
          <FiCheckCircle /> {question.solvedByMe ? 'Solved' : 'Mark Solved'}
        </button>
      </div>
    </div>
  );
}
