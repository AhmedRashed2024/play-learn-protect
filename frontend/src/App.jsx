import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ChildDashboard from './pages/child/ChildDashboard';
import GameLibrary from './pages/child/GameLibrary';
import Leaderboard from './pages/child/Leaderboard';
import GamePlay from './pages/child/GamePlay';
import LearnLibrary from './pages/child/LearnLibrary';
import LearnModule from './pages/child/LearnModule';
import ParentDashboard from './pages/parent/ParentDashboard';
import ManageChildren from './pages/parent/ManageChildren';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Navbar from './components/Navbar';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="page flex-center">
        <div className="animate-pulse">
          <span style={{ fontSize: '3rem' }}>🏛️</span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      child: '/child',
      parent: '/parent',
      teacher: '/teacher',
      admin: '/admin'
    };
    return <Navigate to={dashboardRoutes[user.role] || '/login'} replace />;
  }
  
  return children;
};

// Redirect authenticated users to their dashboard
const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="page flex-center">
        <div className="animate-pulse">
          <span style={{ fontSize: '3rem' }}>🏛️</span>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    const dashboardRoutes = {
      child: '/child',
      parent: '/parent',
      teacher: '/teacher',
      admin: '/admin'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
  }
  
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      {user && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          } 
        />
        
        {/* Child Routes */}
        <Route 
          path="/child" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <ChildDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/child/games" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <GameLibrary />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/child/games/:gameId" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <GamePlay />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/child/leaderboard" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/child/learn" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <LearnLibrary />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/child/learn/:moduleId" 
          element={
            <ProtectedRoute allowedRoles={['child']}>
              <LearnModule />
            </ProtectedRoute>
          } 
        />
        
        {/* Parent Routes */}
        <Route 
          path="/parent" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ParentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/parent/children" 
          element={
            <ProtectedRoute allowedRoles={['parent']}>
              <ManageChildren />
            </ProtectedRoute>
          } 
        />
        
        {/* Teacher Routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
      {/* Decorative pyramid background */}
      <div className="pyramid-bg" aria-hidden="true" />
    </div>
  );
}

export default App;
