/**
 * Python Backend API Types
 */

// Authentication
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'ca' | 'auditor' | 'client';
  company?: string;
  isActive: boolean;
  createdAt: Date;
  lastLoginDate?: Date;
}

// Bills
export interface Bill {
  id: number;
  fileName: string;
  fileUrl?: string;
  status: 'uploaded' | 'processing' | 'processed' | 'failed';
  userId: number;
  invoiceNumber?: string;
  invoiceDate?: Date;
  vendorName?: string;
  vendorGSTIN?: string;
  items?: BillItem[];
  subtotal?: number;
  gstAmount?: number;
  grandTotal?: number;
  extractedData?: any;
  createdAt: Date;
  processedAt?: Date;
}

export interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  gstRate: number;
  gstAmount: number;
}

// OCR
export interface OCRExtractResponse {
  success: boolean;
  data: {
    invoiceNumber?: string;
    invoiceDate?: string;
    vendorName?: string;
    vendorGSTIN?: string;
    items: BillItem[];
    subtotal: number;
    gstAmount: number;
    grandTotal: number;
  };
  confidence: number;
}

// Templates
export interface Template {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  status: 'pending_review' | 'published' | 'rejected';
  creatorId: number;
  downloadCount: number;
  rating: number;
  createdAt: Date;
}

// GST
export interface GSTValidationResponse {
  valid: boolean;
  gstin: string;
  businessName?: string;
  registrationDate?: string;
  state?: string;
  status?: string;
}

export interface GSTCalculationRequest {
  amount: number;
  gstRate: number;
  includesGST?: boolean;
}

export interface GSTCalculationResponse {
  amount: number;
  gstRate: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  totalAmount: number;
}

// Tax
export interface TaxCalculationRequest {
  income: number;
  deductions?: number;
  regime?: 'old' | 'new';
}

export interface TaxCalculationResponse {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
  slabs: TaxSlab[];
}

export interface TaxSlab {
  min: number;
  max: number;
  rate: number;
  tax: number;
}

// API Error
export interface APIError {
  message: string;
  code?: string;
  details?: any;
}
