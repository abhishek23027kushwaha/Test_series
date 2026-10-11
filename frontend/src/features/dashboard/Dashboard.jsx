import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  FiBookOpen,
  FiCheckCircle,
  FiBookmark,
  FiLayers,
  FiArrowRight,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { fetchDashboard } from './dashboardSlice';
import styles from './Dashboard.module.css';

const DIFFICULTY_COLOR = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className={styles.page}>
      {isLoading && <p className={styles.muted}>Loading dashboard...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && (
        <>
          {/* Hero banner */}
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Welcome back, {firstName}!
              </h1>

              <p className={styles.heroSubtitle}>
                {data.solvedCount > 0
                  ? `You've reviewed ${data.solvedCount} questions so far.`
                  : "Start your learning journey today."}
              </p>

              <div className={styles.heroActions}>
                <Link to="/questions" className={styles.heroBtnPrimary}>
                  Continue Learning <FiArrowRight />
                </Link>

                <Link to="/mocktest" className={styles.heroBtnSecondary}>
                  Take Mock Test
                </Link>
              </div>
            </div>

            <div className={styles.heroArt}>
              <img
                src="/dashboard-illustration.png"
                alt=""
                className={styles.heroImage}
              />
            </div>
          </div>

          {/* Stat cards */}
          <div className={styles.statGrid}>
            <StatCard
              icon={<FiBookOpen />}
              iconBg="#dbeafe"
              iconColor="#2563eb"
              label="Total Questions"
              value={data.totalQuestions}
            />
            <StatCard
              icon={<FiCheckCircle />}
              iconBg="#fef3c7"
              iconColor="#d97706"
              label="Questions Reviewed"
              value={data.solvedCount}
            />
            <StatCard
              icon={<FiBookmark />}
              iconBg="#ede9fe"
              iconColor="#7c3aed"
              label="Bookmarked"
              value={data.bookmarkCount}
            />
            <StatCard
              icon={<FiLayers />}
              iconBg="#dcfce7"
              iconColor="#16a34a"
              label="Subjects"
              value={data.subjectCount}
            />
          </div>

          {/* Progress by subject + overall progress */}
          <div className={styles.rowTwo}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Progress by Subject</h2>
              {data.bySubject?.some((s) => s.solved > 0) ? (
                <div className={styles.chartScroll}>
                  <div
                    style={{
                      minWidth: Math.max(data.bySubject.length * 55, 320),
                    }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={data.bySubject.map((s) => ({
                          subject: s._id,
                          solved: s.solved,
                        }))}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f0f0f5"
                        />

                        <XAxis
                          dataKey="subject"
                          tick={{ fontSize: 10 }}
                          interval={0}
                          angle={-40}
                          textAnchor="end"
                          height={70}
                        />

                        <YAxis allowDecimals={false} />

                        <Tooltip
                          cursor={{ fill: "rgba(109,91,240,.08)" }}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #ececec",
                          }}
                        />

                        <Bar
                          dataKey="solved"
                          fill="#6d5bf0"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <Link to="/questions" className={styles.emptyStateLink}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📊</div>

                    <div className={styles.emptyTitle}>
                      No Progress Yet
                    </div>

                    <div className={styles.emptyText}>
Start reviewing questions to see your progress.                    
</div>

                    <div className={styles.emptyAction}>
Review Questions →                    </div>
                  </div>
                </Link>
              )}
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Overall Progress</h2>

              {data.solvedCount > 0 ? (
                <>
                  <div className={styles.donutWrap}>
                    <ResponsiveContainer width={240} height={240}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Solved",
                              value: data.solvedCount,
                            },
                            {
                              name: "Remaining",
                              value: Math.max(
                                data.totalQuestions - data.solvedCount,
                                0
                              ),
                            },
                          ]}
                          dataKey="value"
                          innerRadius={82}
                          outerRadius={105}
                          startAngle={90}
                          endAngle={-270}
                          stroke="none"
                        >
                          <Cell fill="#6d5bf0" />
                          <Cell fill="#eceaf5" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className={styles.donutCenter}>
                      <div className={styles.donutPercent}>
                        {Math.round(data.progressPercent)}%
                      </div>

                      <div className={styles.donutLabel}>
Reviewed                      </div>
                    </div>
                  </div>

                  <div className={styles.donutLegend}>
                    <div className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ background: "#6d5bf0" }}
                      />
Reviewed ({data.solvedCount})                    </div>

                    <div className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ background: "#eceaf5" }}
                      />
                      Remaining (
                      {Math.max(
                        data.totalQuestions - data.solvedCount,
                        0
                      )}
                      )
                    </div>
                  </div>
                </>
              ) : (
                <Link to="/questions" className={styles.emptyStateLink}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🎯</div>

                    <div className={styles.emptyTitle}>
Start Reviewing Questions                    </div>

                    <div className={styles.emptyText}>
                      Your progress will appear here.
                    </div>

                    <div className={styles.emptyAction}>
Review Questions →                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Difficulty / Recent Activity / Continue Learning */}
          <div className={styles.rowThree}>
            <div className={styles.card}>
              <div className={styles.cardHeaderRow}>
                <h2 className={styles.cardTitle}>
                  Difficulty Distribution
                </h2>

                <Link to="/questions" className={styles.viewAll}>
                  View All
                </Link>
              </div>
              {data.byDifficulty?.map((d) => {
                const pct = d.total > 0 ? Math.round((d.total / data.totalQuestions) * 100) : 0;
                return (
                  <div key={d._id} className={styles.diffRow}>
                    <div className={styles.diffLabelRow}>
                      <span>{d._id}</span>
                      <span className={styles.muted}>{d.total} ({pct}%)</span>
                    </div>
                    <div className={styles.diffBarOuter}>
                      <div
                        className={styles.diffBarInner}
                        style={{ width: `${pct}%`, background: DIFFICULTY_COLOR[d._id] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeaderRow}>
                <h2 className={styles.cardTitle}>Recent Activity</h2>
                <Link to="/mocktest" className={styles.viewAll}>View All</Link>
              </div>
              {data.recentActivity.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>⚡</div>
                  <div className={styles.emptyTitle}>
                    No Activity Yet
                  </div>
                  <div className={styles.emptyText}>
Review questions or take a mock test to generate activity.                  </div>
                </div>
              )}
              {data.recentActivity.map((item, idx) => (
                <div key={idx} className={styles.activityItem}>
                  <span className={styles.activityDotWrap}>
                    <span className={styles.activityDot} data-type={item.type} />
                    {item.text}
                  </span>
                  <span className={styles.activityDate}>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeaderRow}>
                <h2 className={styles.cardTitle}>Continue Learning</h2>
                <Link to="/subjects" className={styles.viewAll}>View All</Link>
              </div>
              {data.bySubject?.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📚</div>
                  <div className={styles.emptyTitle}>
                    No Subjects Available
                  </div>
                  <div className={styles.emptyText}>
                    Subjects will appear here once questions are added.
                  </div>
                </div>
              )}
              {[...(data.bySubject || [])]
                .sort((a, b) => a.solved / a.total - b.solved / b.total)
                .slice(0, 4)
                .map((s) => {
                  const pct = s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0;
                  return (
                    <div key={s._id} className={styles.continueRow}>
                      <div className={styles.continueInfo}>
                        <div className={styles.continueName}>
                          📚 {s._id}
                        </div>
                        <div className={styles.continueBarOuter}>
                          <div className={styles.continueBarInner} style={{ width: `${pct}%` }} />
                        </div>
                        <div className={styles.muted} style={{ fontSize: 12 }}>{pct}%</div>
                      </div>
                      <Link to={`/questions?subject=${encodeURIComponent(s._id)}`} className={styles.resumeBtn}>
                        Continue
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <div className={styles.statCard}>
      <div
        className={styles.statIcon}
        style={{
          background: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </div>

      <div>
        <div className={styles.statLabel}>
          {label}
        </div>

        <div className={styles.statValue}>
          {value}
        </div>
      </div>
    </div>
  );
}
