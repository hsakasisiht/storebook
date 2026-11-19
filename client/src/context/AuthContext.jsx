import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pandora_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('pandora_token') || null);
  const [loading, setLoading] = useState(true);

  // Verify and sync user profile on mount
  useEffect(() => {
    const syncUser = async () => {
      if (token) {
        try {
          const res = await getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('pandora_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out.', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    syncUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success && res.token) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('pandora_user', JSON.stringify(res.user));
      localStorage.setItem('pandora_token', res.token);
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (name, email, password) => {
    const res = await registerUser(name, email, password);
    if (res.success && res.token) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('pandora_user', JSON.stringify(res.user));
      localStorage.setItem('pandora_token', res.token);
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pandora_user');
    localStorage.removeItem('pandora_token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
