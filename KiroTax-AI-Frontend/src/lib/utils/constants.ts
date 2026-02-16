/**
 * Application constants
 */

// API URLs
export const API_URLS = {
  PYTHON_BACKEND: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ADMIN_API: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://localhost:5001/api',
  SIGNALR_HUB: process.env.NEXT_PUBLIC_SIGNALR_URL || 'https://localhost:5001/adminHub',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CA: 'ca',
  AUDITOR: 'auditor',
  CLIENT: 'client',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Bill Status
export const BILL_STATUS = {
  UPLOADED: 'uploaded',
  PROCESSING: 'processing',
  PROCESSED: 'processed',
  FAILED: 'failed',
} as const;

export type BillStatus = typeof BILL_STATUS[keyof typeof BILL_STATUS];

// Template Status
export const TEMPLATE_STATUS = {
  PENDING_REVIEW: 'pending_review',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
} as const;

export type TemplateStatus = typeof TEMPLATE_STATUS[keyof typeof TEMPLATE_STATUS];

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_BILL_TYPES: ['.pdf', '.jpg', '.jpeg', '.png'],
  ALLOWED_TEMPLATE_TYPES: ['.json'],
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  FULL: 'dddd, DD MMMM YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
};

// Currency
export const CURRENCY = {
  DEFAULT: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
};

// GST Rates
export const GST_RATES = [0, 5, 12, 18, 28];

// Tax Slabs (FY 2024-25)
export const TAX_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 750000, rate: 10 },
  { min: 750000, max: 1000000, rate: 15 },
  { min: 1000000, max: 1250000, rate: 20 },
  { min: 1250000, max: 1500000, rate: 25 },
  { min: 1500000, max: Infinity, rate: 30 },
];

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// Activity Icons
export const ACTIVITY_ICONS = {
  USER_CREATED: 'person-plus-fill',
  USER_UPDATED: 'person-check-fill',
  USER_DELETED: 'person-x-fill',
  BILL_UPLOADED: 'file-earmark-arrow-up-fill',
  BILL_PROCESSED: 'file-earmark-check-fill',
  BILL_FAILED: 'file-earmark-x-fill',
  TEMPLATE_CREATED: 'file-earmark-code-fill',
  TEMPLATE_APPROVED: 'check-circle-fill',
  TEMPLATE_REJECTED: 'x-circle-fill',
  SETTINGS_UPDATED: 'gear-fill',
  DEFAULT: 'circle-fill',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/dashboard/admin',
  CA_DASHBOARD: '/dashboard/ca',
  AUDITOR_DASHBOARD: '/dashboard/auditor',
  CLIENT_DASHBOARD: '/dashboard/client',
  BILLS: '/bills',
  TEMPLATES: '/templates',
  GST: '/gst',
  TAX: '/tax',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  ADMIN_USERS: '/dashboard/admin/users',
  ADMIN_BILLS: '/dashboard/admin/bills',
  ADMIN_TEMPLATES: '/dashboard/admin/templates',
  ADMIN_ACTIVITY: '/dashboard/admin/activity',
  ADMIN_SETTINGS: '/dashboard/admin/settings',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ADMIN_TOKEN: 'admin_token',
  ADMIN_REFRESH_TOKEN: 'admin_refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  
  // Bills
  BILLS: '/bills',
  BILL_PROCESS: (id: string) => `/bills/${id}/process`,
  
  // OCR
  OCR_EXTRACT: '/ocr/extract',
  OCR_VALIDATE: '/ocr/validate',
  
  // Templates
  TEMPLATES: '/templates',
  
  // GST
  GST_VALIDATE: '/gst/validate',
  GST_DETAILS: (gstin: string) => `/gst/details/${gstin}`,
  GST_CALCULATE: '/gst/calculate',
  
  // Tax
  TAX_CALCULATE: '/tax/calculate',
  TAX_SLABS: '/tax/slabs',
  TAX_DEDUCTIONS: '/tax/deductions',
  
  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_BILLS: '/admin/bills',
  ADMIN_TEMPLATES: '/admin/templates',
  ADMIN_ACTIVITY: '/admin/activity',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_STATS: '/admin/stats',
  
  // File Upload
  FILE_UPLOAD_BILL: '/file/upload/bill',
  FILE_UPLOAD_TEMPLATE: '/file/upload/template',
  FILE_DOWNLOAD: (type: string, fileName: string) => `/file/download/${type}/${fileName}`,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  CREATE_SUCCESS: 'Created successfully!',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  GSTIN_REGEX: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  PAN_REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  SECONDARY: '#6b7280',
};

// Dashboard Stats Colors
export const STATS_COLORS = {
  USERS: '#3b82f6',
  BILLS: '#10b981',
  TEMPLATES: '#f59e0b',
  ACTIVE: '#06b6d4',
};
