import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSubjects } from "./subjectSlice";
import styles from "./Subjects.module.css";

const SUBJECT_EMOJI = {
  React: "⚛️",
  "Node.js": "🟢",
  "Express.js": "🚂",
  MongoDB: "🍃",
  JavaScript: "📜",
  Java: "☕",
  SQL: "🗄️",
  HTML: "🌐",
  CSS: "🎨",
  Bootstrap: "🅱️",
  Angular: "🅰️",
  "Spring Boot": "🌱",
};

export default function Subjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  return (
    <div
      className="page-container"
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <h1 style={{ marginBottom: "6px" }}>Subjects</h1>

      <p
        style={{
          color: "var(--text-muted)",
          marginTop: 0,
          marginBottom: "18px",
        }}
      >
        Pick a subject to browse questions.
      </p>

      {isLoading && <p>Loading subjects...</p>}

      <div className={styles.grid}>
        {items.map((s) => (
          <div
            key={s._id}
            className={`card ${styles.card}`}
            onClick={() =>
              navigate(`/questions?subject=${encodeURIComponent(s.name)}`)
            }
          >
            <div className={styles.icon}>
              {SUBJECT_EMOJI[s.name] || "📘"}
            </div>

            <div className={styles.name}>{s.name}</div>

            <div
              className={styles.badge}
              style={{
                background:
                  s.questionCount > 0
                    ? "rgba(124,108,246,0.18)"
                    : "var(--surface-alt)",
                color:
                  s.questionCount > 0
                    ? "#4338ca"
                    : "var(--text-muted)",
              }}
            >
              {s.questionCount} question{s.questionCount === 1 ? "" : "s"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}