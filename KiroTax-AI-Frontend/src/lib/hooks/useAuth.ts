import { useState, useEffect } from 'react';
import { backendAPI } from '../api/backend';
import { adminAPI } from '../api/admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  company?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const userData = await backendAPI.getCurrentUser();
        setUser(userData);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await backendAPI.login(email, password);
      
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      setUser(response.user);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.login(email, password);
      
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_refresh_token', response.refreshToken);
      
      setUser(response.user);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Admin login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await backendAPI.register(data);
      
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      setUser(response.user);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token');

      const response = await backendAPI.refreshToken(refreshToken);
      localStorage.setItem('access_token', response.access_token);
      return response;
    } catch (err) {
      logout();
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    adminLogin,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
};
