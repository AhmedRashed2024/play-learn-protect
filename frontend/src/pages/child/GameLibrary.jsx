import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getGamesByAgeGroup } from '../../data/games';

const GameLibrary = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get games for child's age group
  const allGames = getGamesByAgeGroup(user.ageGroup);
  
  // Get unique subjects
  const subjects = ['all', ...new Set(allGames.map(g => g.subject))];
  
  // Filter games
  const filteredGames = allGames.filter(game => {
    const matchesSubject = selectedSubject === 'all' || game.subject === selectedSubject;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Subject icons
  const subjectIcons = {
    all: '📚',
    math: '🔢',
    science: '🔬',
    language: '✍️',
    history: '🏛️',
    coding: '💻',
    physics: '⚙️',
    chemistry: '⚗️',
    english: '🌍'
  };

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Game Library 🎮</h1>
        <p className="text-muted">
          Explore educational games for ages {user.ageGroup}
          <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
            • استكشف الألعاب التعليمية
          </span>
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="🔍 Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Subject Filter */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className="btn"
                style={{
                  background: selectedSubject === subject 
                    ? 'var(--color-gold)' 
                    : 'var(--color-sand-light)',
                  color: selectedSubject === subject 
                    ? 'var(--color-deep-blue)' 
                    : 'var(--color-deep-blue)',
                  padding: 'var(--space-2) var(--space-4)',
                  textTransform: 'capitalize'
                }}
              >
                {subjectIcons[subject]} {subject}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {filteredGames.map(game => (
            <Link 
              key={game.id} 
              to={`/child/games/${game.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="game-card">
                {/* Game Image/Icon Header */}
                <div 
                  className="game-card-image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem'
                  }}
                >
                  {game.icon}
                </div>
                
                {/* Game Info */}
                <div className="game-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-2)' }}>
                    <h3 className="game-card-title">{game.title}</h3>
                    <span className={`age-badge age-badge-${game.ageGroup}`} style={{ fontSize: 'var(--font-size-xs)' }}>
                      {game.ageGroup}
                    </span>
                  </div>
                  
                  <p className="text-muted" style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    marginBottom: 'var(--space-3)',
                    minHeight: '40px'
                  }}>
                    {game.description}
                  </p>
                  
                  <div className="game-card-meta">
                    <span title="Points">⭐ {game.points} pts</span>
                    <span title="Duration">⏱️ {game.estimatedTime} min</span>
                    <span title="Subject" style={{ textTransform: 'capitalize' }}>
                      {subjectIcons[game.subject]} {game.subject}
                    </span>
                  </div>
                  
                  <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                    Play Now 🎯
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🔍</div>
          <h3>No games found</h3>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default GameLibrary;
