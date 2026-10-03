import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GAMES } from '../../data/games';

const AdminDashboard = () => {
  const { user, getAllUsers } = useAuth();
  const [activeTab, setActiveTab] = useState('content');
  const [games, setGames] = useState(GAMES);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newGame, setNewGame] = useState({
    title: '',
    titleAr: '',
    description: '',
    ageGroup: '6-8',
    subject: 'math',
    estimatedTime: 15,
    points: 100,
    icon: '🎮'
  });
  
  const users = getAllUsers();
  
  // Stats
  const stats = {
    totalUsers: users.length,
    children: users.filter(u => u.role === 'child').length,
    parents: users.filter(u => u.role === 'parent').length,
    teachers: users.filter(u => u.role === 'teacher').length,
    totalGames: games.length,
    publishedGames: games.filter(g => g.published).length
  };

  const togglePublish = (gameId) => {
    setGames(prev => prev.map(g => 
      g.id === gameId ? { ...g, published: !g.published } : g
    ));
  };

  const deleteGame = (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      setGames(prev => prev.filter(g => g.id !== gameId));
    }
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    const game = {
      ...newGame,
      id: `game_${Date.now()}`,
      published: false
    };
    setGames(prev => [game, ...prev]);
    setShowUploadForm(false);
    setNewGame({
      title: '',
      titleAr: '',
      description: '',
      ageGroup: '6-8',
      subject: 'math',
      estimatedTime: 15,
      points: 100,
      icon: '🎮'
    });
  };

  const icons = ['🎮', '🔢', '🔬', '📚', '✍️', '🏛️', '💻', '⚗️', '📐', '🌍', '🎨', '🎵'];

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Admin Dashboard ⚙️</h1>
        <p className="text-muted">
          Manage platform content and users
          <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>• إدارة محتوى المنصة</span>
        </p>
      </div>

      {/* Stats Row */}
      <div className="dashboard-grid mb-6">
        <div className="stat-card">
          <div className="stat-card-icon">👥</div>
          <div className="stat-card-value">{stats.totalUsers}</div>
          <div className="stat-card-label">Total Users</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🧒</div>
          <div className="stat-card-value">{stats.children}</div>
          <div className="stat-card-label">Children</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🎮</div>
          <div className="stat-card-value">{stats.totalGames}</div>
          <div className="stat-card-label">Total Games</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-value">{stats.publishedGames}</div>
          <div className="stat-card-label">Published</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {[
          { id: 'content', label: '📚 Content Management', labelAr: 'إدارة المحتوى' },
          { id: 'users', label: '👥 Users', labelAr: 'المستخدمين' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="btn"
            style={{
              background: activeTab === tab.id ? 'var(--color-deep-blue)' : 'var(--color-sand)',
              color: activeTab === tab.id ? 'white' : 'var(--color-deep-blue)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Management Tab (FR-9) */}
      {activeTab === 'content' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2>Educational Games</h2>
            <button onClick={() => setShowUploadForm(true)} className="btn btn-primary">
              + Upload New Game
            </button>
          </div>

          {/* Upload Form Modal */}
          {showUploadForm && (
            <div className="modal-overlay" onClick={() => setShowUploadForm(false)}>
              <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                  <h2>Upload New Game</h2>
                  <button className="modal-close" onClick={() => setShowUploadForm(false)}>×</button>
                </div>
                
                <form onSubmit={handleAddGame}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Title (English) *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newGame.title}
                        onChange={(e) => setNewGame(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Title (Arabic)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newGame.titleAr}
                        onChange={(e) => setNewGame(prev => ({ ...prev, titleAr: e.target.value }))}
                        dir="rtl"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newGame.description}
                      onChange={(e) => setNewGame(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Age Group *</label>
                      <select
                        className="form-select"
                        value={newGame.ageGroup}
                        onChange={(e) => setNewGame(prev => ({ ...prev, ageGroup: e.target.value }))}
                      >
                        <option value="3-5">3-5 years</option>
                        <option value="6-8">6-8 years</option>
                        <option value="9-12">9-12 years</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select
                        className="form-select"
                        value={newGame.subject}
                        onChange={(e) => setNewGame(prev => ({ ...prev, subject: e.target.value }))}
                      >
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="language">Language</option>
                        <option value="history">History</option>
                        <option value="coding">Coding</option>
                        <option value="physics">Physics</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="english">English</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Duration (min)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newGame.estimatedTime}
                        onChange={(e) => setNewGame(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) }))}
                        min="5"
                        max="60"
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Points</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newGame.points}
                        onChange={(e) => setNewGame(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                        min="10"
                        max="500"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Icon</label>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                        {icons.map(icon => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => setNewGame(prev => ({ ...prev, icon }))}
                            className="btn"
                            style={{
                              fontSize: '1.25rem',
                              padding: 'var(--space-2)',
                              background: newGame.icon === icon ? 'var(--color-gold)' : 'var(--color-sand-light)'
                            }}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Game File (Mock)</label>
                    <input type="file" className="form-input" accept=".zip,.html5,.mp4" />
                    <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                      Supported: .zip, .html5, .mp4 (max 1GB)
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                    <button type="button" onClick={() => setShowUploadForm(false)} className="btn" style={{ flex: 1, background: 'var(--color-sand)' }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      Upload Game
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Games Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-sand-light)' }}>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>Game</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>Age Group</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>Subject</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>Points</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.slice(0, 10).map(game => (
                  <tr key={game.id} style={{ borderBottom: '1px solid var(--color-sand)' }}>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <span style={{ fontSize: '1.5rem' }}>{game.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600 }}>{game.title}</div>
                          <div className="text-muted arabic" style={{ fontSize: 'var(--font-size-sm)' }}>{game.titleAr}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <span className={`age-badge age-badge-${game.ageGroup}`}>{game.ageGroup}</span>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textTransform: 'capitalize' }}>
                      {game.subject}
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                      ⭐ {game.points}
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                      <span style={{ 
                        padding: 'var(--space-1) var(--space-3)', 
                        borderRadius: 'var(--radius-full)',
                        background: game.published ? 'var(--color-success)' : 'var(--color-sand)',
                        color: game.published ? 'white' : 'var(--color-deep-blue)',
                        fontSize: 'var(--font-size-sm)'
                      }}>
                        {game.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
                        <button 
                          onClick={() => togglePublish(game.id)}
                          className="btn"
                          style={{ 
                            padding: 'var(--space-1) var(--space-3)',
                            fontSize: 'var(--font-size-sm)',
                            background: game.published ? 'var(--color-warning)' : 'var(--color-success)',
                            color: 'white'
                          }}
                        >
                          {game.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button 
                          onClick={() => deleteGame(game.id)}
                          className="btn"
                          style={{ 
                            padding: 'var(--space-1) var(--space-3)',
                            fontSize: 'var(--font-size-sm)',
                            background: 'var(--color-danger)',
                            color: 'white'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Platform Users</h2>
          
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-sand-light)' }}>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>User</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'left' }}>Username</th>
                  <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--color-sand)' }}>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div className="avatar">{u.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          <div className="text-muted arabic" style={{ fontSize: 'var(--font-size-sm)' }}>{u.nameAr}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textTransform: 'capitalize' }}>
                      <span className="age-badge" style={{ 
                        background: {
                          child: 'var(--age-6-8)',
                          parent: 'var(--color-nile-blue)',
                          teacher: 'var(--color-terracotta)',
                          admin: 'var(--color-deep-blue)'
                        }[u.role]
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <code>{u.username}</code>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                      {u.role !== 'admin' && (
                        <button className="btn btn-danger" style={{ padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                          Ban User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
