/**
 * .NET Admin API Client
 * Port: 5001
 * Base URL: https://localhost:5001/api
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://localhost:5001/api';

// For development, ignore SSL certificate errors
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

class AdminAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAdminToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearAdminToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getAdminToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  private clearAdminToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh_token');
    }
  }

  // ============ AUTHENTICATION ============

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.client.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  async validateToken(token: string) {
    const response = await this.client.post('/auth/validate', { token });
    return response.data;
  }

  // ============ USERS ============

  async getUsers(params?: { role?: string; search?: string }) {
    const response = await this.client.get('/admin/users', { params });
    return response.data;
  }

  async getUser(id: number) {
    const response = await this.client.get(`/admin/users/${id}`);
    return response.data;
  }

  async createUser(data: any) {
    const response = await this.client.post('/admin/users', data);
    return response.data;
  }

  async updateUser(id: number, data: any) {
    const response = await this.client.put(`/admin/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: number) {
    const response = await this.client.delete(`/admin/users/${id}`);
    return response.data;
  }

  // ============ BILLS ============

  async getBills(params?: { status?: string; userId?: number }) {
    const response = await this.client.get('/admin/bills', { params });
    return response.data;
  }

  async getBill(id: number) {
    const response = await this.client.get(`/admin/bills/${id}`);
    return response.data;
  }

  async updateBillStatus(id: number, status: string) {
    const response = await this.client.put(`/admin/bills/${id}/status`, { status });
    return response.data;
  }

  // ============ TEMPLATES ============

  async getTemplates(params?: { status?: string; category?: string }) {
    const response = await this.client.get('/admin/templates', { params });
    return response.data;
  }

  async getTemplate(id: number) {
    const response = await this.client.get(`/admin/templates/${id}`);
    return response.data;
  }

  async approveTemplate(id: number, approved: boolean, reason?: string) {
    const response = await this.client.put(`/admin/templates/${id}/approve`, {
      approved,
      reason,
    });
    return response.data;
  }

  // ============ ACTIVITY ============

  async getActivity(params?: { limit?: number; entityType?: string }) {
    const response = await this.client.get('/admin/activity', { params });
    return response.data;
  }

  // ============ SETTINGS ============

  async getSettings() {
    const response = await this.client.get('/admin/settings');
    return response.data;
  }

  async getSetting(key: string) {
    const response = await this.client.get(`/admin/settings/${key}`);
    return response.data;
  }

  async updateSettings(settings: any[]) {
    const response = await this.client.put('/admin/settings', settings);
    return response.data;
  }

  // ============ STATISTICS ============

  async getStats() {
    const response = await this.client.get('/admin/stats');
    return response.data;
  }

  // ============ FILE UPLOAD ============

  async uploadBill(file: File, userId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());

    const response = await this.client.post('/file/upload/bill', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async uploadTemplate(file: File, creatorId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('creatorId', creatorId.toString());

    const response = await this.client.post('/file/upload/template', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async downloadFile(type: string, fileName: string) {
    const response = await this.client.get(`/file/download/${type}/${fileName}`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async deleteFile(type: string, fileName: string) {
    const response = await this.client.delete(`/file/${type}/${fileName}`);
    return response.data;
  }
}

export const adminAPI = new AdminAPI();
export default adminAPI;
