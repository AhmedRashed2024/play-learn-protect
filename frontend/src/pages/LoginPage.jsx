import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  // Quick login for demo purposes
  const demoLogin = async (role) => {
    setLoading(true);
    const credentials = {
      // Child accounts by age group
      'child_3-5': { username: 'fatima', password: 'child123' },
      'child_6-8': { username: 'ahmed', password: 'child123' },
      'child_9-12': { username: 'omar', password: 'child123' },
      // Legacy child option (defaults to 6-8)
      child: { username: 'ahmed', password: 'child123' },
      parent: { username: 'parent', password: 'parent123' },
      teacher: { username: 'teacher', password: 'teacher123' },
      admin: { username: 'admin', password: 'admin123' }
    };
    
    const creds = credentials[role];
    await login(creds.username, creds.password);
    setLoading(false);
  };

  return (
    <div className="page flex-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🏛️</div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }}>
            Play, Learn & Protect
          </h1>
          <p className="arabic text-muted" style={{ fontSize: 'var(--font-size-lg)' }}>
            العب، تعلم واحمِ
          </p>
          <p className="text-muted mt-2">
            Educational platform for Egyptian children
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger mb-4">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-sand)' }}>
          <p className="text-center text-muted mb-4">Quick Demo Login</p>
          
          {/* Child Age Groups */}
          <p className="text-center mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
            👶 Children (by age)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <button 
              onClick={() => demoLogin('child_3-5')} 
              className="btn"
              style={{ background: 'var(--age-3-5)', color: 'white' }}
              disabled={loading}
            >
              <span>👧</span>
              <span>Ages 3-5</span>
            </button>
            
            <button 
              onClick={() => demoLogin('child_6-8')} 
              className="btn"
              style={{ background: 'var(--age-6-8)', color: 'white' }}
              disabled={loading}
            >
              <span>🧒</span>
              <span>Ages 6-8</span>
            </button>
            
            <button 
              onClick={() => demoLogin('child_9-12')} 
              className="btn"
              style={{ background: 'var(--age-9-12)', color: 'white' }}
              disabled={loading}
            >
              <span>👦</span>
              <span>Ages 9-12</span>
            </button>
          </div>
          
          {/* Other Roles */}
          <p className="text-center mb-2" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
            👥 Other Roles
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
            <button 
              onClick={() => demoLogin('parent')} 
              className="btn"
              style={{ background: 'var(--color-nile-blue)', color: 'white' }}
              disabled={loading}
            >
              <span>👨</span>
              <span>Parent</span>
            </button>
            
            <button 
              onClick={() => demoLogin('teacher')} 
              className="btn"
              style={{ background: 'var(--color-terracotta)', color: 'white' }}
              disabled={loading}
            >
              <span>👩‍🏫</span>
              <span>Teacher</span>
            </button>
            
            <button 
              onClick={() => demoLogin('admin')} 
              className="btn"
              style={{ background: 'var(--color-deep-blue)', color: 'white' }}
              disabled={loading}
            >
              <span>🔧</span>
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-muted mt-6" style={{ fontSize: 'var(--font-size-xs)' }}>
          Ages 3-12 • Safe • Culturally Relevant • تعليم آمن للأطفال
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
