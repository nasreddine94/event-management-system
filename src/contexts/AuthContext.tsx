import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Local mock login logic for frontend-only configurator
    const mockUsers: User[] = [
      { id: '1', name: 'John Manager', email: 'manager@example.com', role: 'MANAGER', company: 'EventPro', avatar: 'https://picsum.photos/seed/manager/100' },
      { id: '2', name: 'Alice Attendee', email: 'alice@example.com', role: 'ATTENDEE', company: 'TechCorp', avatar: 'https://picsum.photos/seed/alice/100' },
      { id: '3', name: 'Bob Exhibitor', email: 'bob@example.com', role: 'EXHIBITOR', company: 'GadgetCo', avatar: 'https://picsum.photos/seed/bob/100' },
      { id: '4', name: 'Partner Sam', email: 'sam@example.com', role: 'PARTNER', company: 'RentAll', avatar: 'https://picsum.photos/seed/sam/100' },
    ];

    const userData = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('User not found. Use manager@example.com or alice@example.com');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
