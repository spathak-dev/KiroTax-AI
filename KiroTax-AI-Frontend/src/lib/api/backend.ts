/**
 * Python FastAPI Backend Client
 * Port: 8000
 * Base URL: http://localhost:8000
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class BackendAPI {
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
        const token = this.getToken();
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
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // ============ AUTHENTICATION ============

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(data: any) {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.client.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async getActivity(params?: any) {
    const response = await this.client.get('/activity', { params });
    return response.data;
  }

  async getStats(params?: any) {
    const response = await this.client.get('/admin/stats', { params });
    return response.data;
  }

  async getSettings(params?: any) {
    const response = await this.client.get('/settings', { params });
    return response.data;
  }

  // ============ BILLS ============

  async getBills(params?: any) {
    const response = await this.client.get('/bills', { params });
    return response.data;
  }

  async getBill(id: string) {
    const response = await this.client.get(`/bills/${id}`);
    return response.data;
  }

  async uploadBill(file: File, metadata?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });
    }

    const response = await this.client.post('/bills', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateBill(id: string, data: any) {
    const response = await this.client.put(`/bills/${id}`, data);
    return response.data;
  }

  async deleteBill(id: string) {
    const response = await this.client.delete(`/bills/${id}`);
    return response.data;
  }

  async processBill(id: string) {
    const response = await this.client.post(`/bills/${id}/process`);
    return response.data;
  }

  // ============ OCR ============

  async extractData(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post('/ocr/extract', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async validateExtractedData(data: any) {
    const response = await this.client.post('/ocr/validate', data);
    return response.data;
  }

  // ============ TEMPLATES ============

  async getTemplates(params?: any) {
    const response = await this.client.get('/templates', { params });
    return response.data;
  }

  async getTemplate(id: string) {
    const response = await this.client.get(`/templates/${id}`);
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await this.client.post('/templates', data);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await this.client.put(`/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: string) {
    const response = await this.client.delete(`/templates/${id}`);
    return response.data;
  }

  // ============ GST ============

  async validateGST(gstin: string) {
    const response = await this.client.post('/gst/validate', { gstin });
    return response.data;
  }

  async getGSTDetails(gstin: string) {
    const response = await this.client.get(`/gst/details/${gstin}`);
    return response.data;
  }

  async calculateGST(data: any) {
    const response = await this.client.post('/gst/calculate', data);
    return response.data;
  }

  // ============ TAX ============

  async calculateTax(data: any) {
    const response = await this.client.post('/tax/calculate', data);
    return response.data;
  }

  async getTaxSlabs() {
    const response = await this.client.get('/tax/slabs');
    return response.data;
  }

  async calculateDeductions(data: any) {
    const response = await this.client.post('/tax/deductions', data);
    return response.data;
  }

  // ============ TENDERS ============

  async getTenders(params?: any) {
    const response = await this.client.get('/tenders', { params });
    return response.data;
  }

  async getTender(id: string) {
    const response = await this.client.get(`/tenders/${id}`);
    return response.data;
  }

  // ============ MAPPER ============

  async mapData(data: any) {
    const response = await this.client.post('/map', data);
    return response.data;
  }
}

export const backendAPI = new BackendAPI();
export default backendAPI;
