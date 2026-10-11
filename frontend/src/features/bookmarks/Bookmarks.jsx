import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiBookmark, FiSearch } from 'react-icons/fi';
import { fetchBookmarks } from '../questions/questionSlice';
import BookmarkCard from './BookmarkCard';
import styles from './Bookmarks.module.css';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const { bookmarkedQuestions, bookmarksLoading, bookmarksError } = useSelector((state) => state.questions);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  const subjectCounts = useMemo(() => {
    const counts = {};
    bookmarkedQuestions.forEach((q) => {
      counts[q.subject] = (counts[q.subject] || 0) + 1;
    });
    return counts;
  }, [bookmarkedQuestions]);

  const subjectOptions = Object.keys(subjectCounts).sort();

  const filtered = useMemo(() => {
    return bookmarkedQuestions.filter((q) => {
      const matchesSubject = !subject || q.subject === subject;
      const matchesSearch =
        !search ||
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        (q.description || '').toLowerCase().includes(search.toLowerCase());
      return matchesSubject && matchesSearch;
    });
  }, [bookmarkedQuestions, subject, search]);

  return (
    <div className="page-container">
      <div className={styles.headerRow}>
        <div>
          <h1 style={{ margin: 0 }}>Bookmarked Questions</h1>
          <p className={styles.subtitle}>Questions you've saved to revisit later.</p>
        </div>
      </div>

      {!bookmarksLoading && bookmarkedQuestions.length > 0 && (
        <div className={styles.summaryBar}>
          <span className={styles.summaryTotal}>
            <FiBookmark /> {bookmarkedQuestions.length} Bookmarked Question
            {bookmarkedQuestions.length === 1 ? '' : 's'}
          </span>
          {subjectOptions.map((s) => (
            <span key={s} className={styles.summaryChip}>
              {s}: {subjectCounts[s]}
            </span>
          ))}
        </div>
      )}

      {bookmarksError && <p className="error-text">{bookmarksError}</p>}

      {!bookmarksLoading && bookmarkedQuestions.length > 0 && (
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} />
            <input
              className={styles.input}
              placeholder="Search bookmarked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className={styles.input} value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All Subjects</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {bookmarksLoading && <p>Loading bookmarks...</p>}

      {!bookmarksLoading && bookmarkedQuestions.length === 0 && !bookmarksError && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FiBookmark />
          </div>
          <h3>No bookmarks yet</h3>
          <p>
            Head over to the <strong>Questions</strong> page and tap <strong>Bookmark</strong> on any question — it
            will show up here automatically so you can find it again later.
          </p>
        </div>
      )}

      {!bookmarksLoading && bookmarkedQuestions.length > 0 && filtered.length === 0 && (
        <p style={{ color: 'var(--text-muted)' }}>No bookmarks match your search.</p>
      )}

      <div className={styles.grid}>
        {filtered.map((q, idx) => (
          <BookmarkCard key={q._id} question={q} index={idx + 1} total={filtered.length} />
        ))}
      </div>
    </div>
  );
}
