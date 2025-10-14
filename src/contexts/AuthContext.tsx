import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type UserRole = 'student' | 'teacher' | 'institution' | null;

interface User {
  id: number;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const login = (role: UserRole) => {
    // In a real app, this would make an API call
    // For our prototype, we'll use mock data
    
    let mockUser: User | null = null;
    
    if (role === 'student') {
      mockUser = {
        id: 1,
        name: 'Aditi Sharma',
        role: 'student',
        avatar: '/student-avatar.png'
      };
      navigate('/student/dashboard');
    } else if (role === 'teacher') {
      mockUser = {
        id: 1,
        name: 'Dr. Ravi Kumar',
        role: 'teacher',
        avatar: '/teacher-avatar.png'
      };
      navigate('/teacher/dashboard');
    } else if (role === 'institution') {
      mockUser = {
        id: 1,
        name: 'Admin',
        role: 'institution',
        avatar: '/admin-avatar.png'
      };
      navigate('/institution/dashboard');
    }

    if (mockUser) {
      setUser(mockUser);
      toast.success(`Welcome, ${mockUser.name}!`);
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('You have been logged out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};