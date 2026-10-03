import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ManageChildren = () => {
  const { user, getChildren, addChildProfile, generateLoginCode } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', nameAr: '', age: '', avatar: '👶' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [generatedCodes, setGeneratedCodes] = useState({});
  
  const children = getChildren();
  
  const avatars = ['👶', '👦', '👧', '🧒', '👲', '🧒🏽', '👦🏿', '👧🏻'];

  const handleAddChild = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const result = await addChildProfile({
      ...newChild,
      age: parseInt(newChild.age)
    });
    
    if (result.success) {
      setMessage({ type: 'success', text: `${newChild.name} has been added successfully!` });
      setNewChild({ name: '', nameAr: '', age: '', avatar: '👶' });
      setShowAddForm(false);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  // Determine age group from age
  const getAgeGroup = (age) => {
    if (age >= 3 && age <= 5) return '3-5';
    if (age >= 6 && age <= 8) return '6-8';
    if (age >= 9 && age <= 12) return '9-12';
    return 'N/A';
  };

  // Handle generate login code
  const handleGenerateLoginCode = async (childId) => {
    setLoading(true);
    setMessage(null);
    
    const result = await generateLoginCode(childId);
    
    if (result.success) {
      setGeneratedCodes(prev => ({ ...prev, [childId]: result.code }));
      setMessage({ type: 'success', text: `Login code generated: ${result.code}` });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Manage Children 👨‍👧‍👦</h1>
          <p className="text-muted">
            Add and manage your children's profiles
            <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>• إدارة ملفات أطفالك</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link to="/parent" className="btn" style={{ background: 'var(--color-sand)' }}>
            ← Back to Dashboard
          </Link>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
            + Add Child
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-6`}>
          <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Add Child Form Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Child</h2>
              <button className="modal-close" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddChild}>
              <div className="form-group">
                <label className="form-label">Name (English) *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newChild.name}
                  onChange={(e) => setNewChild(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Ahmed"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Name (Arabic) <span className="arabic">الاسم بالعربية</span></label>
                <input
                  type="text"
                  className="form-input"
                  value={newChild.nameAr}
                  onChange={(e) => setNewChild(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="e.g., أحمد"
                  dir="rtl"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Age (3-12) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={newChild.age}
                  onChange={(e) => setNewChild(prev => ({ ...prev, age: e.target.value }))}
                  min="3"
                  max="12"
                  required
                />
                {newChild.age && (
                  <p className="text-muted mt-2" style={{ fontSize: 'var(--font-size-sm)' }}>
                    Age group: <span className={`age-badge age-badge-${getAgeGroup(parseInt(newChild.age))}`} style={{ fontSize: 'var(--font-size-xs)' }}>
                      {getAgeGroup(parseInt(newChild.age))}
                    </span>
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Avatar</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {avatars.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setNewChild(prev => ({ ...prev, avatar }))}
                      className="btn"
                      style={{
                        fontSize: '1.5rem',
                        padding: 'var(--space-2)',
                        background: newChild.avatar === avatar ? 'var(--color-gold)' : 'var(--color-sand-light)',
                        border: newChild.avatar === avatar ? '2px solid var(--color-gold)' : '2px solid transparent'
                      }}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn" style={{ flex: 1, background: 'var(--color-sand)' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                  {loading ? 'Adding...' : 'Add Child'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Children Grid */}
      {children.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          {children.map(child => (
            <div key={child.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div className="avatar-lg" style={{ fontSize: '2.5rem' }}>{child.avatar}</div>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-1)' }}>{child.name}</h3>
                  <p className="arabic text-muted">{child.nameAr}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <span className={`age-badge age-badge-${child.ageGroup}`}>
                  Age {child.age} ({child.ageGroup})
                </span>
                <span className="points-display">⭐ {child.points}</span>
              </div>
              
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)' }}>
                  <strong>Login Credentials:</strong>
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Username: <code>{child.username}</code>
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>
                  Password: <code>child123</code>
                </p>
              </div>

              {/* Login Code Section */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-gold-light)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', border: '2px solid var(--color-gold)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)', fontWeight: 'bold' }}>
                  🔐 Login Code:
                </p>
                {(generatedCodes[child.id] || child.loginCode) ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: 'var(--font-size-2xl)', 
                      fontWeight: 'bold', 
                      letterSpacing: '0.5rem',
                      color: 'var(--color-primary)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      {generatedCodes[child.id] || child.loginCode}
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      Share this code with your child to login
                    </p>
                  </div>
                ) : (
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                    No login code generated yet
                  </p>
                )}
                <button 
                  onClick={() => handleGenerateLoginCode(child.id)} 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : '🔑 Generate Login Code'}
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }}>
                  📊 View Progress
                </button>
                <button className="btn" style={{ background: 'var(--color-sand)' }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>👨‍👧‍👦</div>
          <h2>No Children Added Yet</h2>
          <p className="text-muted mb-6">
            Add your children to create personalized learning experiences.
          </p>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-lg">
            + Add Your First Child
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageChildren;
