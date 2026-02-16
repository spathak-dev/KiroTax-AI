'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

type DocType = 'purchase' | 'sales' | 'expense' | 'import';

interface DocumentUploadProps {
    onUpload: (file: File, type: DocType) => void;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
    const [selectedType, setSelectedType] = useState<DocType>('purchase');
    const [file, setFile] = useState<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
    });

    const handleSubmit = () => {
        if (file) {
            onUpload(file, selectedType);
        }
    };

    return (
        <div className="card p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Step 1: Upload Document</h2>

            <div className="mb-6">
                <label className="label mb-2">Document Type</label>
                <div className="flex gap-3">
                    {(['purchase', 'sales', 'expense', 'import'] as DocType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${selectedType === type
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input {...getInputProps()} />
                {file ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                        <span className="font-medium">{file.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                            }}
                            className="p-1 hover:bg-green-100 rounded-full"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Upload size={32} />
                        <p>Drag & drop a bill here, or click to select</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                    </div>
                )}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!file}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Process Document
            </button>
        </div>
    );
}
