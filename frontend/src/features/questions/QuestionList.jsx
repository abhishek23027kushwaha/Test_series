import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { fetchQuestions, fetchBookmarks, openForm } from './questionSlice';
import { fetchSubjects } from '../subjects/subjectSlice';
import QuestionCard from './QuestionCard';
import QuestionForm from './QuestionForm';
import styles from './Questions.module.css';

export default function QuestionList() {
  const dispatch = useDispatch();
  const { items, isLoading, error, formOpen } = useSelector((state) => state.questions);
  const { items: subjects } = useSelector((state) => state.subjects);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchBookmarks());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchQuestions({ search, subject, difficulty }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [dispatch, search, subject, difficulty]);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Interview Questions</h1>
        <button className="btn" onClick={() => dispatch(openForm())}>
          <FiPlus /> Add Question
        </button>
      </div>

      <div className={styles.toolbar}>
        <input
          className={`${styles.input} ${styles.search}`}
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={styles.input} value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>
        <select className={styles.input} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {isLoading && <p>Loading questions...</p>}
      {error && <p className="error-text">{error}</p>}
      {!isLoading && items.length === 0 && (
        <p style={{ color: 'var(--text-muted)' }}>No questions found. Add the first one!</p>
      )}

      <div className={styles.list}>
        {items.map((q) => (
          <QuestionCard key={q._id} question={q} />
        ))}
      </div>

      {formOpen && <QuestionForm />}
    </div>
  );
}
