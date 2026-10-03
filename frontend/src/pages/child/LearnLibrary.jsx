import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getModulesByAgeGroup } from '../../data/learningModules';

const LearnLibrary = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get modules for child's age group
  const allModules = getModulesByAgeGroup(user.ageGroup);
  
  // Get unique subjects
  const subjects = ['all', ...new Set(allModules.map(m => m.subject))];
  
  // Filter modules
  const filteredModules = allModules.filter(module => {
    const matchesSubject = selectedSubject === 'all' || module.subject === selectedSubject;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchTerm.toLowerCase());
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
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Learn 📚</h1>
        <p className="text-muted">
          Explore learning modules for ages {user.ageGroup}
          <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
            • استكشف وحدات التعلم
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
              placeholder="🔍 Search modules..."
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

      {/* Modules Grid */}
      {filteredModules.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          {filteredModules.map(module => (
            <Link 
              key={module.id} 
              to={`/child/learn/${module.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="game-card">
                {/* Module Image/Icon Header */}
                <div 
                  className="game-card-image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    background: 'linear-gradient(135deg, var(--color-nile-blue) 0%, var(--color-deep-blue) 100%)'
                  }}
                >
                  {module.icon}
                </div>
                
                {/* Module Info */}
                <div className="game-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-2)' }}>
                    <h3 className="game-card-title">{module.title}</h3>
                    <span className={`age-badge age-badge-${module.ageGroup}`} style={{ fontSize: 'var(--font-size-xs)' }}>
                      {module.ageGroup}
                    </span>
                  </div>
                  
                  <p className="text-muted" style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    marginBottom: 'var(--space-3)',
                    minHeight: '40px'
                  }}>
                    {module.description}
                  </p>
                  
                  <div className="game-card-meta">
                    <span title="Duration">⏱️ {module.estimatedTime} min</span>
                    <span title="Subject" style={{ textTransform: 'capitalize' }}>
                      {subjectIcons[module.subject]} {module.subject}
                    </span>
                  </div>
                  
                  <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                    Start Learning 📖
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>📚</div>
          <h3>No learning modules found</h3>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default LearnLibrary;


