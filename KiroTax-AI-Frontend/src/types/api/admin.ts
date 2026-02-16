/**
 * .NET Admin API Types
 */

// Authentication
export interface AdminLoginResponse {
  token: string;
  refreshToken: string;
  user: AdminUser;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  company?: string;
}

// Statistics
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalBills: number;
  processedBills: number;
  processingBills: number;
  failedBills: number;
  totalTemplates: number;
  publishedTemplates: number;
  pendingTemplates: number;
  usersToday: number;
  billsToday: number;
}

// Activity Log
export interface ActivityLog {
  id: number;
  action: string;
  description?: string;
  userId?: number;
  entityType?: string;
  entityId?: number;
  timestamp: Date;
  icon: string;
}

// System Settings
export interface SystemSetting {
  id: number;
  key: string;
  value?: string;
  description?: string;
  updatedAt: Date;
}

// File Upload
export interface FileUploadResponse {
  success: boolean;
  fileName: string;
  originalFileName: string;
  fileUrl: string;
  fileSize: number;
  billId?: number;
  message: string;
}

// Template Approval
export interface TemplateApprovalRequest {
  approved: boolean;
  reason?: string;
}

// Bill Status Update
export interface BillStatusUpdateRequest {
  status: 'uploaded' | 'processing' | 'processed' | 'failed';
}
