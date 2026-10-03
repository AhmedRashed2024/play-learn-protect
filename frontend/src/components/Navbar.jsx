import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  // Define navigation items based on role
  const getNavItems = () => {
    switch (user.role) {
      case 'child':
        return [
          { path: '/child', label: 'Home', labelAr: 'الرئيسية', icon: '🏠' },
          { path: '/child/learn', label: 'Learn', labelAr: 'تعلم', icon: '📚' },
          { path: '/child/games', label: 'Games', labelAr: 'الألعاب', icon: '🎮' },
          { path: '/child/leaderboard', label: 'Leaderboard', labelAr: 'المتصدرين', icon: '🏆' }
        ];
      case 'parent':
        return [
          { path: '/parent', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: '📊' },
          { path: '/parent/children', label: 'My Children', labelAr: 'أطفالي', icon: '👨‍👧‍👦' }
        ];
      case 'teacher':
        return [
          { path: '/teacher', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: '📊' }
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: '⚙️' }
        ];
      default:
        return [];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span>🏛️</span>
        <span>PLP</span>
        <span className="arabic" style={{ fontSize: '0.8em', opacity: 0.8 }}>العب، تعلم واحمِ</span>
      </Link>
      
      <ul className="navbar-nav">
        {navItems.map(item => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        {user.role === 'child' && (
          <div className="points-display">
            <span className="points-icon">⭐</span>
            <span>{user.points || 0} pts</span>
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'white' }}>
          <span style={{ fontSize: '1.5rem' }}>{user.avatar}</span>
          <span>{user.name}</span>
        </div>
        
        <button 
          onClick={logout} 
          className="btn"
          style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: 'var(--space-2) var(--space-4)'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
