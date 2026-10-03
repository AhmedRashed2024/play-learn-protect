import { useAuth } from '../../contexts/AuthContext';
import { getLeaderboardByAgeGroup } from '../../data/leaderboard';

const Leaderboard = () => {
  const { user } = useAuth();
  
  // Get leaderboard for user's age group
  const leaderboard = getLeaderboardByAgeGroup(user.ageGroup);
  
  // Find user's rank
  const userRank = leaderboard.findIndex(entry => entry.id === user.id) + 1;

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>🏆 Leaderboard</h1>
        <p className="text-muted">
          Top learners in ages {user.ageGroup}
          <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
            • المتصدرون في الفئة العمرية
          </span>
        </p>
        <span className={`age-badge age-badge-${user.ageGroup} mt-4`} style={{ display: 'inline-block' }}>
          Ages {user.ageGroup}
        </span>
      </div>

      {/* Top 3 Podium */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
        gap: 'var(--space-4)', 
        marginBottom: 'var(--space-8)',
        padding: 'var(--space-6)'
      }}>
        {/* 2nd Place */}
        {leaderboard[1] && (
          <div className="card text-center" style={{ 
            padding: 'var(--space-4)', 
            width: '150px',
            background: 'linear-gradient(180deg, #E2E8F0 0%, #CBD5E0 100%)'
          }}>
            <div style={{ fontSize: '3rem' }}>🥈</div>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>{leaderboard[1].avatar}</div>
            <h4 style={{ marginBottom: 'var(--space-1)' }}>{leaderboard[1].nickname}</h4>
            <p className="text-gold" style={{ fontWeight: 700 }}>{leaderboard[1].points} pts</p>
          </div>
        )}
        
        {/* 1st Place */}
        {leaderboard[0] && (
          <div className="card text-center" style={{ 
            padding: 'var(--space-6)', 
            width: '180px',
            background: 'linear-gradient(180deg, #F6E05E 0%, #D69E2E 100%)',
            transform: 'scale(1.1)'
          }}>
            <div style={{ fontSize: '3.5rem' }}>🥇</div>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>{leaderboard[0].avatar}</div>
            <h3 style={{ marginBottom: 'var(--space-1)' }}>{leaderboard[0].nickname}</h3>
            <p style={{ fontWeight: 700, color: 'var(--color-deep-blue)' }}>{leaderboard[0].points} pts</p>
            {leaderboard[0].badge && <span style={{ fontSize: '1.5rem' }}>{leaderboard[0].badge}</span>}
          </div>
        )}
        
        {/* 3rd Place */}
        {leaderboard[2] && (
          <div className="card text-center" style={{ 
            padding: 'var(--space-4)', 
            width: '150px',
            background: 'linear-gradient(180deg, #ECC94B 0%, #B7791F 100%)'
          }}>
            <div style={{ fontSize: '3rem' }}>🥉</div>
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>{leaderboard[2].avatar}</div>
            <h4 style={{ marginBottom: 'var(--space-1)' }}>{leaderboard[2].nickname}</h4>
            <p className="text-gold" style={{ fontWeight: 700 }}>{leaderboard[2].points} pts</p>
          </div>
        )}
      </div>

      {/* Your Position Card */}
      {userRank > 0 && (
        <div className="card card-gold mb-6" style={{ 
          background: 'var(--color-gold-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>#{userRank}</span>
            <div className="avatar">{user.avatar}</div>
            <div>
              <h4>Your Position</h4>
              <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
                {userRank <= 3 ? "You're on the podium! 🎉" : `${userRank - 3} positions away from top 3`}
              </p>
            </div>
          </div>
          <div className="points-display">
            <span>⭐</span>
            <span>{user.points} pts</span>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h3>Top 10 Learners</h3>
        </div>
        
        {leaderboard.slice(0, 10).map((entry, index) => (
          <div 
            key={entry.id}
            className={`leaderboard-item ${entry.id === user.id ? 'current-user' : ''}`}
          >
            <div className={`leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
              {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
            </div>
            <div className="leaderboard-avatar">{entry.avatar}</div>
            <div style={{ flex: 1 }}>
              <div className="leaderboard-name">
                {entry.nickname}
                {entry.id === user.id && <span style={{ marginLeft: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-terracotta)' }}>(You)</span>}
              </div>
              <div className="text-muted arabic" style={{ fontSize: 'var(--font-size-sm)' }}>
                {entry.nicknameAr}
              </div>
            </div>
            {entry.badge && <span style={{ fontSize: '1.25rem' }}>{entry.badge}</span>}
            <div className="leaderboard-points">⭐ {entry.points}</div>
          </div>
        ))}
      </div>

      {/* Motivation Message */}
      <div className="card text-center mt-6" style={{ 
        background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-nile-blue) 100%)',
        color: 'white'
      }}>
        <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-2)' }}>
          Keep Learning! 📚
        </h3>
        <p>Play more games to earn points and climb the leaderboard!</p>
        <p className="arabic" style={{ opacity: 0.9, marginTop: 'var(--space-2)' }}>
          استمر في التعلم واللعب لكسب المزيد من النقاط!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
