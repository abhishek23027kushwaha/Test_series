import React from 'react';
import { useDispatch } from 'react-redux';
import { FiCheck, FiX } from 'react-icons/fi';
import { resetTest } from './mockTestSlice';
import styles from './MockTest.module.css';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function MockTestResult({ result }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto 30px' }}>
        <h2>Test Complete 🎉</h2>
        <p style={{ color: 'var(--text-muted)' }}>{result.subject} Mock Test</p>

        <div className={styles.resultGrid}>
          <div className={styles.resultStat}>
            <div className={styles.resultValue} style={{ color: '#4f46e5' }}>{result.percentage}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Score</div>
          </div>
          <div className={styles.resultStat}>
            <div className={styles.resultValue} style={{ color: '#16a34a' }}>{result.correct}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Correct</div>
          </div>
          <div className={styles.resultStat}>
            <div className={styles.resultValue} style={{ color: '#dc2626' }}>{result.wrong}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Wrong</div>
          </div>
        </div>

        <button className="btn" onClick={() => dispatch(resetTest())}>Back to MockTest Page</button>
      </div>

      <h2 style={{ marginBottom: 14 }}>Full Paper Review</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {result.review.map((item, idx) => (
          <div key={idx} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontWeight: 600 }}>
                {idx + 1}. {item.title}
              </div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: item.isCorrect ? '#dcfce7' : '#fee2e2',
                  color: item.isCorrect ? '#166534' : '#b91c1c',
                  whiteSpace: 'nowrap',
                  marginLeft: 12,
                }}
              >
                {item.isCorrect ? <FiCheck /> : <FiX />} {item.isCorrect ? 'Correct' : 'Wrong'}
              </span>
            </div>
            {item.description && <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 10 }}>{item.description}</p>}

            <div style={{ display: 'grid', gap: 6 }}>
              {item.options.map((opt, optIdx) => {
                const isCorrectOpt = optIdx === item.correctOption;
                const isSelectedOpt = optIdx === item.selectedOption;
                let bg = 'var(--surface-alt)';
                let border = '1px solid var(--border)';
                let color = 'var(--text)';
                if (isCorrectOpt) {
                  bg = '#dcfce7';
                  border = '1px solid #16a34a';
                  color = '#166534';
                } else if (isSelectedOpt && !isCorrectOpt) {
                  bg = '#fee2e2';
                  border = '1px solid #dc2626';
                  color = '#b91c1c';
                }
                return (
                  <div
                    key={optIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border,
                      background: bg,
                      color,
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0,
                      }}
                    >
                      {OPTION_LABELS[optIdx]}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isCorrectOpt && <span style={{ fontSize: 12, fontWeight: 700 }}>Correct answer</span>}
                    {isSelectedOpt && !isCorrectOpt && <span style={{ fontSize: 12, fontWeight: 700 }}>Your answer</span>}
                  </div>
                );
              })}
              {item.selectedOption === -1 && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>You didn't answer this one.</p>
              )}
            </div>

            {item.explanation && (
              <div
                style={{
                  marginTop: 10,
                  background: 'var(--surface-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                <strong style={{ color: 'var(--text)' }}>Why: </strong>{item.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
