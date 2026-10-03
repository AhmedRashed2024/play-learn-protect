import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ALERTS } from '../../data/alerts';

const TeacherDashboard = () => {
  const { user, getStudents } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  const students = getStudents();
  const currentStudent = selectedStudent || students[0];

  // Get alerts for teacher's students
  const studentIds = students.map((s) => s.id);
  const alerts = ALERTS.filter((a) => studentIds.includes(a.childId));
  const unreadAlerts = alerts.filter((a) => !a.read);

  // Mock data
  const classStats = {
    totalStudents: students.length,
    avgPoints:
      Math.round(
        students.reduce((acc, s) => acc + s.points, 0) / students.length
      ) || 0,
    activeToday: 2,
    gamesCompleted: 15
  };

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Teacher Dashboard 👩‍🏫</h1>
        <p className="text-muted">
          Monitor your students' learning progress • {user.institution}
          <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
            • راقب تقدم طلابك
          </span>
        </p>
      </div>

      {/* Alerts Banner */}
      {unreadAlerts.length > 0 && (
        <div className="alert alert-danger mb-6">
          <span>🚨</span>
          <div style={{ flex: 1 }}>
            <strong>
              {unreadAlerts.length} Alert{unreadAlerts.length > 1 ? 's' : ''}{' '}
              Requiring Attention
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
            className="btn btn-danger"
            onClick={() => setShowAllAlerts(true)}
          >
            View All Alerts
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
              <h2>🚨 All Student Alerts ({alerts.length})</h2>
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
                <p className="text-muted">No alerts for your students</p>
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
                                Student: {alert.childName}
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

      {/* Class Overview Stats */}
      <div className="dashboard-grid mb-6">
        <div className="stat-card">
          <div className="stat-card-icon">👨‍👧‍👦</div>
          <div className="stat-card-value">{classStats.totalStudents}</div>
          <div className="stat-card-label">Total Students</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value text-gold">
            {classStats.avgPoints}
          </div>
          <div className="stat-card-label">Avg. Points</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">🟢</div>
          <div className="stat-card-value">{classStats.activeToday}</div>
          <div className="stat-card-label">Active Today</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">🎮</div>
          <div className="stat-card-value">{classStats.gamesCompleted}</div>
          <div className="stat-card-label">Games This Week</div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 'var(--space-6)'
        }}
      >
        {/* Student List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-deep-blue)',
              color: 'white'
            }}
          >
            <h3>My Students</h3>
          </div>

          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
                cursor: 'pointer',
                background:
                  currentStudent?.id === student.id
                    ? 'var(--color-gold-light)'
                    : 'white',
                borderBottom: '1px solid var(--color-sand)'
              }}
            >
              <div className="avatar">{student.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{student.name}</div>
                <div
                  className="text-muted"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  {student.points} points
                </div>
              </div>
              <span
                className={`age-badge age-badge-${student.ageGroup}`}
                style={{ fontSize: 'var(--font-size-xs)' }}
              >
                {student.ageGroup}
              </span>
            </div>
          ))}
        </div>

        {/* Student Details */}
        {currentStudent && (
          <div>
            {/* Student Header */}
            <div
              className="card mb-6"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-terracotta) 0%, var(--color-gold) 100%)',
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
                  {currentStudent.avatar}
                </div>
                <div>
                  <h2
                    style={{ color: 'white', marginBottom: 'var(--space-1)' }}
                  >
                    {currentStudent.name}
                  </h2>
                  <p className="arabic" style={{ opacity: 0.9 }}>
                    {currentStudent.nameAr}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--space-3)',
                      marginTop: 'var(--space-2)'
                    }}
                  >
                    <span
                      className={`age-badge age-badge-${currentStudent.ageGroup}`}
                    >
                      Age {currentStudent.age}
                    </span>
                    <span className="points-display">
                      ⭐ {currentStudent.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}
            >
              <div className="stat-card">
                <div className="stat-card-icon">⏱️</div>
                <div className="stat-card-value">45m</div>
                <div className="stat-card-label">Today's Screen Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">🎮</div>
                <div className="stat-card-value">3</div>
                <div className="stat-card-label">Games Today</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">📈</div>
                <div className="stat-card-value">85%</div>
                <div className="stat-card-label">Avg. Score</div>
              </div>
            </div>

            {/* Performance & Hints */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)'
              }}
            >
              <div className="card">
                <h4 style={{ marginBottom: 'var(--space-3)' }}>
                  📊 Subject Performance
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)'
                  }}
                >
                  {[
                    { subject: 'Math', score: 92 },
                    { subject: 'Science', score: 78 },
                    { subject: 'Language', score: 65 }
                  ].map((item) => (
                    <div key={item.subject}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 'var(--space-1)'
                        }}
                      >
                        <span>{item.subject}</span>
                        <span style={{ fontWeight: 600 }}>{item.score}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h4 style={{ marginBottom: 'var(--space-3)' }}>
                  💡 Hint Usage (FR-13)
                </h4>
                <p className="text-muted mb-4">
                  Track which topics students need extra help with.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    flexWrap: 'wrap'
                  }}
                >
                  <span
                    className="age-badge"
                    style={{ background: 'var(--color-warning)' }}
                  >
                    Language: 5 hints
                  </span>
                  <span
                    className="age-badge"
                    style={{ background: 'var(--color-success)' }}
                  >
                    Math: 1 hint
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
