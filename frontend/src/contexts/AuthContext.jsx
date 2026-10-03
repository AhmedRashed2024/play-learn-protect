import { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext(null);

// Demo users for prototype
const DEMO_USERS = {
  child1: {
    id: 'child1',
    username: 'ahmed',
    password: 'child123',
    role: 'child',
    name: 'Ahmed',
    nameAr: 'أحمد',
    age: 7,
    ageGroup: '6-8',
    avatar: '🧒',
    points: 450,
    parentId: 'parent1'
  },
  child2: {
    id: 'child2',
    username: 'fatima',
    password: 'child123',
    role: 'child',
    name: 'Fatima',
    nameAr: 'فاطمة',
    age: 4,
    ageGroup: '3-5',
    avatar: '👧',
    points: 280,
    parentId: 'parent1'
  },
  child3: {
    id: 'child3',
    username: 'omar',
    password: 'child123',
    role: 'child',
    name: 'Omar',
    nameAr: 'عمر',
    age: 10,
    ageGroup: '9-12',
    avatar: '👦',
    points: 720,
    parentId: 'parent2'
  },
  parent1: {
    id: 'parent1',
    username: 'parent',
    password: 'parent123',
    role: 'parent',
    name: 'Mohamed',
    nameAr: 'محمد',
    avatar: '👨',
    children: ['child1', 'child2']
  },
  parent2: {
    id: 'parent2',
    username: 'parent2',
    password: 'parent123',
    role: 'parent',
    name: 'Sara',
    nameAr: 'سارة',
    avatar: '👩',
    children: ['child3']
  },
  teacher1: {
    id: 'teacher1',
    username: 'teacher',
    password: 'teacher123',
    role: 'teacher',
    name: 'Ms. Layla',
    nameAr: 'أ. ليلى',
    avatar: '👩‍🏫',
    institution: 'Cairo Elementary School',
    students: ['child1', 'child2', 'child3']
  },
  admin1: {
    id: 'admin1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'System Admin',
    nameAr: 'مدير النظام',
    avatar: '🔧'
  }
};

// Storage keys
const STORAGE_KEYS = {
  currentUser: 'plp_current_user',
  users: 'plp_users',
  gameProgress: 'plp_game_progress',
  screenTimeSettings: 'plp_screen_time',
  alerts: 'plp_alerts'
};

// Initialize localStorage with demo data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(DEMO_USERS));
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    initializeStorage();
    const savedUser = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.currentUser);
      }
    }
    setLoading(false);
  }, []);

  // Login function - ready for Supabase integration
  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    const foundUser = Object.values(users).find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // Don't store password in session
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(userWithoutPassword)
      );
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  };

  // Get user's children (for parents)
  const getChildren = () => {
    if (!user || user.role !== 'parent') return [];
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    return user.children.map((childId) => users[childId]).filter(Boolean);
  };

  // Get teacher's students
  const getStudents = () => {
    if (!user || user.role !== 'teacher') return [];
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    return user.students.map((studentId) => users[studentId]).filter(Boolean);
  };

  // Update child profile
  const updateChildProfile = async (childId, updates) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    if (users[childId]) {
      users[childId] = { ...users[childId], ...updates };
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
      return { success: true };
    }
    return { success: false, error: 'Child not found' };
  };

  // Add child profile (for parents)
  const addChildProfile = async (childData) => {
    if (!user || user.role !== 'parent') {
      return { success: false, error: 'Not authorized' };
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    const childId = `child_${Date.now()}`;

    // Determine age group
    let ageGroup = '3-5';
    if (childData.age >= 6 && childData.age <= 8) ageGroup = '6-8';
    else if (childData.age >= 9) ageGroup = '9-12';

    const newChild = {
      id: childId,
      username: childData.name.toLowerCase(),
      password: 'child123',
      role: 'child',
      name: childData.name,
      nameAr: childData.nameAr || childData.name,
      age: childData.age,
      ageGroup,
      avatar: childData.avatar || '👶',
      points: 0,
      parentId: user.id
    };

    users[childId] = newChild;

    // Update parent's children list
    users[user.id].children = [...(users[user.id].children || []), childId];

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));

    // Update current user
    const updatedUser = { ...user, children: users[user.id].children };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(updatedUser));

    return { success: true, child: newChild };
  };

  // Get all users (for admin)
  const getAllUsers = () => {
    if (!user || user.role !== 'admin') return [];
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    return Object.values(users).map(({ password, ...u }) => u);
  };

  // Generate login code for child (mock functionality)
  const generateLoginCode = async (childId) => {
    if (!user || user.role !== 'parent') {
      return { success: false, error: 'Not authorized' };
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '{}');
    const child = users[childId];

    if (!child || child.parentId !== user.id) {
      return { success: false, error: 'Child not found or not authorized' };
    }

    // Generate random 6-digit code
    const loginCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the login code in the child's data
    users[childId] = { ...child, loginCode, loginCodeGeneratedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));

    return { success: true, code: loginCode };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getChildren,
    getStudents,
    updateChildProfile,
    addChildProfile,
    getAllUsers,
    generateLoginCode,
    isAuthenticated: !!user,
    isChild: user?.role === 'child',
    isParent: user?.role === 'parent',
    isTeacher: user?.role === 'teacher',
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { STORAGE_KEYS };
export default AuthContext;
