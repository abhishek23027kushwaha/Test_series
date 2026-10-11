import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiClock } from 'react-icons/fi';
import { startTest, submitTest, resetTest, fetchResultHistory, fetchResultDetail } from './mockTestSlice';
import { fetchSubjects } from '../subjects/subjectSlice';
import MockTestResult from './MockTestResult';
import styles from './MockTest.module.css';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function MockTest() {
  const dispatch = useDispatch();
  const { items: subjects } = useSelector((state) => state.subjects);
  const {
    questions,
    subject,
    isLoading,
    error,
    result,
    history,
    isHistoryLoading,
    isDetailLoading,
  } = useSelector((state) => state.mockTest);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [count, setCount] = useState(10);
  const [minutes, setMinutes] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const timerRef = useRef(null);
  const answersRef = useRef({});

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchResultHistory());
  }, [dispatch]);

  const handleViewDetails = (id) => {
    dispatch(fetchResultDetail(id));
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
  };

  const scoreColor = (pct) => {
    if (pct >= 75) return { background: '#dcfce7', color: '#166534' };
    if (pct >= 40) return { background: '#fef3c7', color: '#92400e' };
    return { background: '#fee2e2', color: '#b91c1c' };
  };

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (questions.length > 0 && !result) {
      setSecondsLeft(minutes * 60);
      setAnswers({});
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            doSubmit();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const handleStart = (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    dispatch(startTest({ subject: selectedSubject, count }));
  };

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const doSubmit = () => {
    clearInterval(timerRef.current);
    const finalAnswers = questions.map((q) => ({
      questionId: q._id,
      selectedOption: answersRef.current[q._id] !== undefined ? answersRef.current[q._id] : -1,
    }));
    dispatch(
      submitTest({
        subject,
        durationMinutes: minutes,
        answers: finalAnswers,
      })
    );
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const answeredCount = Object.keys(answers).length;

  if (result) {
    return (
      <div className="page-container">
        <MockTestResult result={result} />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page-container">
        <h1>Start a Mock Test</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Configure your custom mock test parameters. Answers will be graded automatically upon submission.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className={`card ${styles.setupForm}`} onSubmit={handleStart}>
          <div className={styles.setupRow}>
            <div className={`${styles.setupField} ${styles.grow}`}>
              <label className={styles.fieldLabel}>Select Subject</label>
              <select
                className={styles.input}
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s._id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className={`${styles.setupField} ${styles.narrow}`}>
              <label className={styles.fieldLabel}>Number of Questions</label>
              <input
                className={styles.input}
                type="number"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
            <div className={`${styles.setupField} ${styles.narrow}`}>
              <label className={styles.fieldLabel}>Duration (minutes)</label>
              <input
                className={styles.input}
                type="number"
                min={1}
                max={120}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </div>
          </div>
          <button type="submit" className="btn" disabled={isLoading} style={{ alignSelf: 'flex-start' }}>
            {isLoading ? 'Preparing test...' : 'Start Mock Test'}
          </button>
        </form>

        <div className={`card ${styles.historySection}`}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Previous Mock Test History</h2>

          {isHistoryLoading && <p style={{ color: 'var(--text-muted)' }}>Loading history...</p>}

          {!isHistoryLoading && history.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>You haven't taken any mock tests yet. Start one above to see it here.</p>
          )}

          {!isHistoryLoading && history.length > 0 && (
            <div className={styles.historyTableWrap}>
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Duration</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h._id}>
                      <td>{formatDate(h.createdAt)}</td>
                      <td>{h.subject}</td>
                      <td>
                        <span className={styles.scoreBadge} style={scoreColor(h.percentage)}>
                          {h.percentage}%
                        </span>
                      </td>
                      <td>{h.durationMinutes} min</td>
                      <td>
                        <button
                          type="button"
                          className={styles.detailsBtn}
                          onClick={() => handleViewDetails(h._id)}
                          disabled={isDetailLoading}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className={styles.timerBar}>
        <h1 style={{ margin: 0 }}>{subject} Mock Test</h1>
        <div className={styles.timer}>
          <FiClock /> {formatTime(secondsLeft)}
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)' }}>
        {answeredCount} of {questions.length} answered. Pick one option per question — you'll see the full paper with correct answers after you submit.
      </p>

      {questions.map((q, idx) => (
        <div key={q._id} className={`card ${styles.questionBlock}`}>
          <div className={styles.qNumber}>Question {idx + 1} of {questions.length} · {q.difficulty}</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{q.title}</div>
          {q.description && <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 12 }}>{q.description}</p>}

          <div style={{ display: 'grid', gap: 8 }}>
            {q.options.map((opt, optIdx) => {
              const isSelected = answers[q._id] === optIdx;
              return (
                <button
                  type="button"
                  key={optIdx}
                  onClick={() => handleSelect(q._id, optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(124,108,246,0.15)' : 'var(--surface-alt)',
                    fontSize: 14,
                    color: 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: isSelected ? 'var(--primary)' : 'var(--surface-alt)',
                      color: isSelected ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {OPTION_LABELS[optIdx]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
        <button className="btn" onClick={doSubmit} disabled={isLoading}>
          {isLoading ? 'Grading...' : 'Submit Test'}
        </button>
        <button className="btn secondary" onClick={() => dispatch(resetTest())}>Cancel</button>
      </div>
    </div>
  );
}
