import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getGamesByAgeGroup } from '../../data/games';
import { getLeaderboardByAgeGroup } from '../../data/leaderboard';

const ChildDashboard = () => {
  const { user } = useAuth();
  
  // Get games for child's age group
  const games = getGamesByAgeGroup(user.ageGroup);
  const featuredGames = games.slice(0, 3);
  
  // Get leaderboard position
  const leaderboard = getLeaderboardByAgeGroup(user.ageGroup);
  const myRank = leaderboard.findIndex(entry => entry.id === user.id) + 1;
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="page container animate-fade-in">
      {/* Welcome Section */}
      <div className="card card-gold mb-6" style={{ 
        background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-nile-blue) 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-2)' }}>
              Welcome, {user.name}! 👋
            </h1>
            <p className="arabic" style={{ opacity: 0.9 }}>
              مرحباً {user.nameAr}! استعد للتعلم والمرح
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-2)' }}>{user.avatar}</div>
            <span className={`age-badge age-badge-${user.ageGroup}`}>
              Ages {user.ageGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-grid mb-6">
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value text-gold">{user.points || 0}</div>
          <div className="stat-card-label">Total Points</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">#{myRank || '--'}</div>
          <div className="stat-card-label">Leaderboard Rank</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🎮</div>
          <div className="stat-card-value">{games.length}</div>
          <div className="stat-card-label">Games Available</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">3</div>
          <div className="stat-card-label">Achievements</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        
        {/* Featured Games */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2>Featured Games 🎮</h2>
            <Link to="/child/games" className="btn btn-secondary">
              See All
            </Link>
          </div>
          
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {featuredGames.map(game => (
              <Link 
                key={game.id} 
                to={`/child/games/${game.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-sand-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {game.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: 'var(--space-1)' }}>{game.title}</h4>
                    <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>
                      {game.description}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gold)' }}>
                        ⭐ {game.points} pts
                      </span>
                      <span style={{ fontSize: 'var(--font-size-sm)' }}>
                        ⏱️ {game.estimatedTime} min
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-primary">Play</button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mini Leaderboard */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2>Top Learners 🏆</h2>
            <Link to="/child/leaderboard" className="btn" style={{ background: 'var(--color-sand)', padding: 'var(--space-2) var(--space-3)' }}>
              View All
            </Link>
          </div>
          
          <div className="card">
            {topThree.map((entry, index) => (
              <div 
                key={entry.id}
                className={`leaderboard-item ${entry.id === user.id ? 'current-user' : ''}`}
                style={{ borderBottom: index < 2 ? '1px solid var(--color-sand)' : 'none' }}
              >
                <div className={`leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <div className="leaderboard-avatar">{entry.avatar}</div>
                <div className="leaderboard-name">{entry.nickname}</div>
                <div className="leaderboard-points">{entry.points}</div>
              </div>
            ))}
            
            {myRank > 3 && (
              <>
                <div style={{ textAlign: 'center', padding: 'var(--space-2)', color: 'var(--color-sand)' }}>···</div>
                <div className="leaderboard-item current-user">
                  <div className="leaderboard-rank">#{myRank}</div>
                  <div className="leaderboard-avatar">{user.avatar}</div>
                  <div className="leaderboard-name">{user.name} (You)</div>
                  <div className="leaderboard-points">{user.points}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-6">
        <h2 className="mb-4">My Achievements 🎖️</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div className="achievement-badge" title="First Steps">🎯</div>
          <div className="achievement-badge" title="Knowledge Seeker">📚</div>
          <div className="achievement-badge" title="Quick Learner">⚡</div>
          <div className="achievement-badge" style={{ opacity: 0.3 }} title="Locked">🔒</div>
          <div className="achievement-badge" style={{ opacity: 0.3 }} title="Locked">🔒</div>
          <div className="achievement-badge" style={{ opacity: 0.3 }} title="Locked">🔒</div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
