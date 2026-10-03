import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALERTS } from '../../data/alerts';

const ParentDashboard = () => {
  const { user, getChildren } = useAuth();
  const [selectedChild, setSelectedChild] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const children = getChildren();
  const currentChild = selectedChild || children[0];

  // Get alerts for parent's children
  const childIds = children.map((c) => c.id);
  const alerts = ALERTS.filter((a) => childIds.includes(a.childId));
  const unreadAlerts = alerts.filter((a) => !a.read);

  // Mock screen time data (FR-5)
  const screenTimeData = {
    day: { total: 45, games: 30, learning: 15 },
    week: { total: 180, games: 120, learning: 60 },
    month: { total: 720, games: 480, learning: 240 }
  };

  // Mock activity log (FR-6)
  const activityLog = [
    {
      time: '2 hours ago',
      action: 'Completed "Sphinx\'s Math Riddles"',
      points: 80
    },
    { time: '3 hours ago', action: 'Started "Tales of the Nile"', points: 0 },
    { time: 'Yesterday', action: 'Earned "Quick Learner" badge', points: 50 },
    { time: '2 days ago', action: 'Completed "Mummy Science Lab"', points: 100 }
  ];

  // Mock performance data (FR-7)
  const performanceData = {
    currentMonth: { points: 280, gamesCompleted: 5, avgScore: 85 },
    previousMonth: { points: 220, gamesCompleted: 4, avgScore: 78 },
    strengths: ['Math', 'Science'],
    weaknesses: ['Language']
  };

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}
      >
        <div>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>
            Parent Dashboard 📊
          </h1>
          <p className="text-muted">
            Monitor your children's learning progress
            <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
              • راقب تقدم أطفالك
            </span>
          </p>
        </div>
        <Link to="/parent/children" className="btn btn-primary">
          👨‍👧‍👦 Manage Children
        </Link>
      </div>

      {/* Alerts Banner (FR-8, FR-16) */}
      {unreadAlerts.length > 0 && (
        <div className="alert alert-warning mb-6">
          <span>🔔</span>
          <div style={{ flex: 1 }}>
            <strong>
              You have {unreadAlerts.length} new alert
              {unreadAlerts.length > 1 ? 's' : ''}
            </strong>
            <p
              style={{
                marginTop: 'var(--space-1)',
                fontSize: 'var(--font-size-sm)'
              }}
            >
              {unreadAlerts[0].message}
            </p>
          </div>
          <button
            className="btn"
            style={{ background: 'var(--color-warning)', color: 'white' }}
            onClick={() => setShowAllAlerts(true)}
          >
            View All
          </button>
        </div>
      )}

      {/* All Alerts Modal/Section */}
      {showAllAlerts && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)'
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                borderBottom: '2px solid var(--color-sand)'
              }}
            >
              <h2>🔔 All Alerts ({alerts.length})</h2>
              <button
                onClick={() => setShowAllAlerts(false)}
                className="btn"
                style={{
                  background: 'var(--color-sand-light)',
                  fontSize: 'var(--font-size-lg)',
                  padding: 'var(--space-2) var(--space-4)'
                }}
              >
                ✕
              </button>
            </div>

            {alerts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <div
                  style={{ fontSize: '3rem', marginBottom: 'var(--space-3)' }}
                >
                  📭
                </div>
                <p className="text-muted">No alerts yet</p>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}
              >
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="card"
                    style={{
                      padding: 'var(--space-4)',
                      background: alert.read
                        ? 'white'
                        : 'var(--color-sand-light)',
                      border: `2px solid ${
                        alert.severity === 'high'
                          ? 'var(--color-danger)'
                          : alert.severity === 'medium'
                          ? 'var(--color-warning)'
                          : 'var(--color-success)'
                      }`
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--space-3)',
                        alignItems: 'start'
                      }}
                    >
                      <div style={{ fontSize: '2rem' }}>
                        {alert.type === 'cyberbullying'
                          ? '🚨'
                          : alert.type === 'screen_time'
                          ? '⏱️'
                          : alert.type === 'achievement'
                          ? '🏆'
                          : alert.type === 'progress'
                          ? '📈'
                          : '🔔'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                gap: 'var(--space-2)',
                                alignItems: 'center',
                                marginBottom: 'var(--space-1)'
                              }}
                            >
                              <span
                                className="age-badge"
                                style={{
                                  background:
                                    alert.severity === 'high'
                                      ? 'var(--color-danger)'
                                      : alert.severity === 'medium'
                                      ? 'var(--color-warning)'
                                      : 'var(--color-success)',
                                  color: 'white',
                                  textTransform: 'uppercase',
                                  fontSize: 'var(--font-size-xs)'
                                }}
                              >
                                {alert.severity}
                              </span>
                              <span
                                className="text-muted"
                                style={{ fontSize: 'var(--font-size-sm)' }}
                              >
                                {alert.childName}
                              </span>
                            </div>
                            <h4 style={{ marginBottom: 'var(--space-2)' }}>
                              {alert.message}
                            </h4>
                            <p
                              className="arabic text-muted"
                              style={{
                                fontSize: 'var(--font-size-sm)',
                                marginBottom: 'var(--space-2)'
                              }}
                            >
                              {alert.messageAr}
                            </p>
                            {alert.context && (
                              <p
                                className="text-muted"
                                style={{ fontSize: 'var(--font-size-sm)' }}
                              >
                                {alert.context}
                              </p>
                            )}
                          </div>
                          {!alert.read && (
                            <span
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: 'var(--color-danger)',
                                display: 'inline-block',
                                flexShrink: 0
                              }}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: 'var(--space-2)',
                            borderTop: '1px solid var(--color-sand)'
                          }}
                        >
                          <span
                            className="text-muted"
                            style={{ fontSize: 'var(--font-size-sm)' }}
                          >
                            {new Date(alert.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {alert.severity === 'high' && (
                            <button
                              className="btn btn-danger"
                              style={{ fontSize: 'var(--font-size-sm)' }}
                            >
                              Take Action
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
          <label
            className="form-label"
            style={{ marginBottom: 'var(--space-3)' }}
          >
            Select Child:
          </label>
          <div
            style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
          >
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className="btn"
                style={{
                  background:
                    currentChild?.id === child.id
                      ? 'var(--color-gold)'
                      : 'var(--color-sand-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{child.avatar}</span>
                <span>{child.name}</span>
                <span
                  className={`age-badge age-badge-${child.ageGroup}`}
                  style={{ fontSize: 'var(--font-size-xs)' }}
                >
                  {child.age}y
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentChild && (
        <>
          {/* Child Info Header */}
          <div
            className="card card-gold mb-6"
            style={{
              background:
                'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-nile-blue) 100%)',
              color: 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)'
              }}
            >
              <div className="avatar-lg" style={{ fontSize: '3rem' }}>
                {currentChild.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    color: 'var(--color-gold)',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  {currentChild.name}
                </h2>
                <p className="arabic" style={{ opacity: 0.9 }}>
                  {currentChild.nameAr}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    marginTop: 'var(--space-2)'
                  }}
                >
                  <span
                    className={`age-badge age-badge-${currentChild.ageGroup}`}
                  >
                    Age {currentChild.age} ({currentChild.ageGroup})
                  </span>
                  <span className="points-display">
                    ⭐ {currentChild.points} points
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="dashboard-grid mb-6">
            <div className="stat-card">
              <div className="stat-card-icon">⏱️</div>
              <div className="stat-card-value">
                {screenTimeData[timeRange].total}m
              </div>
              <div className="stat-card-label">Screen Time ({timeRange})</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon">🎮</div>
              <div className="stat-card-value">
                {performanceData.currentMonth.gamesCompleted}
              </div>
              <div className="stat-card-label">Games Completed</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon">📈</div>
              <div className="stat-card-value">
                {performanceData.currentMonth.avgScore}%
              </div>
              <div className="stat-card-label">Avg. Score</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon">⭐</div>
              <div className="stat-card-value text-gold">
                {currentChild.points}
              </div>
              <div className="stat-card-label">Total Points</div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-6)'
            }}
          >
            {/* Screen Time (FR-5) */}
            <div className="card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <h3>⏱️ Screen Time</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {['day', 'week', 'month'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className="btn"
                      style={{
                        background:
                          timeRange === range
                            ? 'var(--color-turquoise)'
                            : 'var(--color-sand-light)',
                        color:
                          timeRange === range
                            ? 'white'
                            : 'var(--color-deep-blue)',
                        padding: 'var(--space-1) var(--space-3)',
                        fontSize: 'var(--font-size-sm)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  <span>Total: {screenTimeData[timeRange].total} minutes</span>
                </div>
                <div
                  className="progress-bar"
                  style={{ marginBottom: 'var(--space-3)' }}
                >
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min(
                        (screenTimeData[timeRange].total / 720) * 100,
                        100
                      )}%`
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: 'var(--space-3)',
                    background: 'var(--color-sand-light)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div
                    style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}
                  >
                    {screenTimeData[timeRange].games}m
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    Games
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: 'var(--space-3)',
                    background: 'var(--color-sand-light)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div
                    style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}
                  >
                    {screenTimeData[timeRange].learning}m
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    Learning
                  </div>
                </div>
              </div>

              {/* Screen Time Limit Setting (FR-12) */}
              <div
                style={{
                  marginTop: 'var(--space-4)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-sand)'
                }}
              >
                <label className="form-label">Daily Limit:</label>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    alignItems: 'center'
                  }}
                >
                  <select className="form-select" style={{ flex: 1 }}>
                    <option value="30">30 minutes</option>
                    <option value="60" selected>
                      1 hour
                    </option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                    <option value="0">No limit</option>
                  </select>
                  <button className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>

            {/* Activity Log (FR-6) */}
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>
                📋 Recent Activity
              </h3>

              {activityLog.map((activity, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-3) 0',
                    borderBottom:
                      index < activityLog.length - 1
                        ? '1px solid var(--color-sand)'
                        : 'none'
                  }}
                >
                  <div>
                    <div>{activity.action}</div>
                    <div
                      className="text-muted"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      {activity.time}
                    </div>
                  </div>
                  {activity.points > 0 && (
                    <span className="text-gold" style={{ fontWeight: 600 }}>
                      +{activity.points} pts
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Comparison (FR-7) */}
          <div className="card mt-6">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>
              📊 Performance Overview
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-4)'
              }}
            >
              <div>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>
                  Monthly Comparison
                </h4>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: 'var(--space-4)',
                      background: 'var(--color-sand-light)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div
                      className="text-muted"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      This Month
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 700,
                        color: 'var(--color-success)'
                      }}
                    >
                      {performanceData.currentMonth.points} pts
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: 'var(--space-4)',
                      background: 'var(--color-sand-light)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div
                      className="text-muted"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      Last Month
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 700
                      }}
                    >
                      {performanceData.previousMonth.points} pts
                    </div>
                  </div>
                </div>
                <div
                  className="text-success mt-2"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  ↑{' '}
                  {Math.round(
                    ((performanceData.currentMonth.points -
                      performanceData.previousMonth.points) /
                      performanceData.previousMonth.points) *
                      100
                  )}
                  % improvement
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>Strengths 💪</h4>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    flexWrap: 'wrap'
                  }}
                >
                  {performanceData.strengths.map((s) => (
                    <span
                      key={s}
                      className="age-badge"
                      style={{ background: 'var(--color-success)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: 'var(--space-3)' }}>
                  Needs Attention ⚠️
                </h4>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    flexWrap: 'wrap'
                  }}
                >
                  {performanceData.weaknesses.map((w) => (
                    <span
                      key={w}
                      className="age-badge"
                      style={{ background: 'var(--color-warning)' }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements (FR-7) */}
          <div className="card mt-6">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>🏆 Achievements</h3>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div className="achievement-badge">🎯</div>
                <div
                  className="text-muted mt-2"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  First Steps
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="achievement-badge">📚</div>
                <div
                  className="text-muted mt-2"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  Knowledge Seeker
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="achievement-badge">⚡</div>
                <div
                  className="text-muted mt-2"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  Quick Learner
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {children.length === 0 && (
        <div
          className="card text-center"
          style={{ padding: 'var(--space-12)' }}
        >
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>
            👨‍👧‍👦
          </div>
          <h2>No Children Added Yet</h2>
          <p className="text-muted mb-6">
            Add your children to start monitoring their learning progress.
          </p>
          <Link to="/parent/children" className="btn btn-primary btn-lg">
            Add Child
          </Link>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
