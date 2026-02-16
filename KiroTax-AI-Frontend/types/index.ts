export type Role = 
  | 'OWNER'
  | 'PRACTICE_HEAD'
  | 'SENIOR_CA'
  | 'ARTICLE'
  | 'AUDIT'
  | 'INVESTOR';

export type Permission =
  | '*'
  | 'view_all_clients'
  | 'approve_filing'
  | 'view_investment_summary'
  | 'view_assigned_clients'
  | 'upload_documents'
  | 'upload_audit_docs'
  | 'view_portfolio'
  | 'add_investment'
  | 'update_portfolio'
  | 'view_analytics'
  | 'upload_broker_statement';

export type DocumentTag = 'purchase' | 'sales' | 'expense' | 'import';

export type DocumentStatus = 'pending' | 'flagged' | 'approved';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  token?: string;
}

export interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  tag: DocumentTag;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedAt: string;
  ocrData?: OCRData;
  auditNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface OCRData {
  vendorName: string;
  gst: string;
  amount: number;
  date: string;
  invoiceNo: string;
  items: OCRItem[];
}

export interface OCRItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvestmentRecord {
  id: string;
  investorId: string;
  date: string;
  type: string;
  amount: number;
  description: string;
  brokerStatement?: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalExpenses: number;
  gstCollected: number;
  gstPaid: number;
  netProfit: number;
  pendingApprovals: number;
}
