import { z } from 'zod';

// Bill upload validation schema
export const billUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type),
      'File must be PDF, JPEG, or PNG'
    ),
  userId: z.number().positive('User ID is required'),
  metadata: z
    .object({
      description: z.string().optional(),
      category: z.string().optional(),
    })
    .optional(),
});

// Bill edit validation schema
export const billEditSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().or(z.date()),
  vendorName: z.string().min(1, 'Vendor name is required'),
  vendorGSTIN: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format')
    .optional(),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Item description is required'),
      quantity: z.number().positive('Quantity must be positive'),
      rate: z.number().positive('Rate must be positive'),
      amount: z.number().positive('Amount must be positive'),
      gstRate: z.number().min(0).max(100, 'GST rate must be between 0 and 100'),
    })
  ),
  subtotal: z.number().positive('Subtotal must be positive'),
  gstAmount: z.number().min(0, 'GST amount cannot be negative'),
  grandTotal: z.number().positive('Grand total must be positive'),
});

// Bill filter validation schema
export const billFilterSchema = z.object({
  status: z.enum(['uploaded', 'processing', 'processed', 'failed']).optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  vendorName: z.string().optional(),
  search: z.string().optional(),
});

// Bill status update validation schema
export const billStatusUpdateSchema = z.object({
  status: z.enum(['uploaded', 'processing', 'processed', 'failed']),
  reason: z.string().optional(),
});

// Export types
export type BillUploadInput = z.infer<typeof billUploadSchema>;
export type BillEditInput = z.infer<typeof billEditSchema>;
export type BillFilterInput = z.infer<typeof billFilterSchema>;
export type BillStatusUpdateInput = z.infer<typeof billStatusUpdateSchema>;
