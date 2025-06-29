import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'project-manager' | 'engineer' | 'contractor' | 'viewer';
  avatar?: string;
  department: string;
  permissions: Permission[];
  lastActive: string;
  isOnline: boolean;
  preferences: UserPreferences;
}

export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface UserPreferences {
  language: 'tr' | 'en';
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  defaultView: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  hasPermission: (module: string, action: string) => boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample users data
  const sampleUsers: User[] = [
    {
      id: 'user-1',
      email: 'admin@company.com',
      name: 'Ahmet Yılmaz',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      department: 'Yönetim',
      permissions: [
        { module: 'all', actions: ['read', 'write', 'delete', 'approve'] }
      ],
      lastActive: new Date().toISOString(),
      isOnline: true,
      preferences: {
        language: 'tr',
        theme: 'light',
        notifications: { email: true, push: true, inApp: true },
        defaultView: 'dashboard'
      }
    },
    {
      id: 'user-2',
      email: 'pm@company.com',
      name: 'Fatma Demir',
      role: 'project-manager',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
      department: 'Proje Yönetimi',
      permissions: [
        { module: 'projects', actions: ['read', 'write', 'approve'] },
        { module: 'suppliers', actions: ['read', 'write'] },
        { module: 'quality', actions: ['read', 'write'] },
        { module: 'safety', actions: ['read', 'write'] }
      ],
      lastActive: new Date(Date.now() - 300000).toISOString(),
      isOnline: true,
      preferences: {
        language: 'tr',
        theme: 'light',
        notifications: { email: true, push: false, inApp: true },
        defaultView: 'projects'
      }
    },
    {
      id: 'user-3',
      email: 'engineer@company.com',
      name: 'Mehmet Kaya',
      role: 'engineer',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      department: 'Mühendislik',
      permissions: [
        { module: 'projects', actions: ['read', 'write'] },
        { module: 'quality', actions: ['read', 'write'] },
        { module: 'technical', actions: ['read', 'write'] }
      ],
      lastActive: new Date(Date.now() - 900000).toISOString(),
      isOnline: false,
      preferences: {
        language: 'tr',
        theme: 'dark',
        notifications: { email: false, push: true, inApp: true },
        defaultView: 'technical'
      }
    },
    {
      id: 'user-4',
      email: 'contractor@company.com',
      name: 'Ali Özkan',
      role: 'contractor',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      department: 'Saha',
      permissions: [
        { module: 'projects', actions: ['read'] },
        { module: 'safety', actions: ['read', 'write'] },
        { module: 'quality', actions: ['read'] }
      ],
      lastActive: new Date(Date.now() - 1800000).toISOString(),
      isOnline: false,
      preferences: {
        language: 'tr',
        theme: 'light',
        notifications: { email: true, push: true, inApp: false },
        defaultView: 'safety'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Check for stored user session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
        setUsers(sampleUsers);
      } catch (err) {
        setError('Kullanıcı verileri yüklenirken hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = sampleUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        const updatedUser = { ...foundUser, isOnline: true, lastActive: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return true;
      } else {
        setError('Geçersiz email veya şifre');
        return false;
      }
    } catch (err) {
      setError('Giriş yapılırken hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (user) {
      const updatedUser = { ...user, isOnline: false };
      setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (users.some(u => u.email === userData.email)) {
        setError('Bu email adresi zaten kullanılıyor');
        return false;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email || '',
        name: userData.name || '',
        role: userData.role || 'viewer',
        department: userData.department || '',
        permissions: userData.permissions || [
          { module: 'projects', actions: ['read'] }
        ],
        lastActive: new Date().toISOString(),
        isOnline: true,
        preferences: {
          language: 'tr',
          theme: 'light',
          notifications: { email: true, push: true, inApp: true },
          defaultView: 'dashboard'
        }
      };

      setUsers(prev => [...prev, newUser]);
      return true;
    } catch (err) {
      setError('Kullanıcı kaydedilirken hata oluştu');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>): Promise<boolean> => {
    try {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, ...updates } : u
      ));
      
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (err) {
      setError('Kullanıcı güncellenirken hata oluştu');
      return false;
    }
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      setUsers(prev => prev.filter(u => u.id !== userId));
      return true;
    } catch (err) {
      setError('Kullanıcı silinirken hata oluştu');
      return false;
    }
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check specific permissions
    return user.permissions.some(permission => 
      (permission.module === module || permission.module === 'all') &&
      permission.actions.includes(action as any)
    );
  };

  const value: AuthContextType = {
    user,
    users,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
    hasPermission,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};