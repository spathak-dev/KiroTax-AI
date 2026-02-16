import React from 'react';
import { OCRData } from '@/types';

interface OCRFieldsPanelProps {
    data: OCRData;
    editable?: boolean;
    onChange?: (field: keyof OCRData, value: any) => void;
}

export default function OCRFieldsPanel({ data, editable = false, onChange }: OCRFieldsPanelProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                        {data.vendorName}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                        {data.gst || data.gstIn}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Invoice No</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                        {data.invoiceNo}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                        {data.date}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200 font-bold">
                        {data.amount}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Line Items</label>
                <div className="bg-gray-50 rounded border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.items?.map((item: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="px-4 py-2 text-sm text-gray-900">{item.description || item.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{item.quantity || item.qty}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{item.amount || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
