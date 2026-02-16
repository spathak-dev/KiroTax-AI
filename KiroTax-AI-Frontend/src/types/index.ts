export type Role = 'OWNER' | 'PRACTICE_HEAD' | 'SENIOR_CA' | 'ARTICLE' | 'AUDIT' | 'INVESTOR' | 'ADMIN' | 'CA' | 'CLIENT' | 'AUDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export type DocumentTag = 'purchase' | 'sales' | 'expense' | 'import';

export interface OCRItem {
  name?: string;
  description?: string;
  qty?: number;
  quantity?: number;
  rate?: number;
  amount?: number;
  updated?: boolean;
}

export interface OCRData {
  vendorName: string;
  gstIn?: string;
  gst?: string;
  amount: number;
  date: string;
  invoiceNo: string;
  items: OCRItem[];
}

export interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  tag: DocumentTag;
  status: 'pending' | 'approved' | 'rejected' | 'flagged' | 'processing';
  uploadedBy: string;
  uploadedAt: string;
  ocrData?: OCRData;
  auditNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  gstCollected: number;
  gstPaid: number;
  pendingApprovals: number;
  revenue?: number;
  expenses?: number;
  taxLiability?: number;
  pendingInvoices?: number;
  processedInvoices?: number;
  revenueGrowth?: number;
  expenseGrowth?: number;
}

export interface InvestmentRecord {
  id: string;
  investorId: string;
  date: string;
  type: string;
  amount: number;
  description: string;
  currentValue?: number;
  roi?: number;
  status?: 'active' | 'exited';
  documentUrl?: string;
}
