import React, { useRef } from 'react';
import { CloudUpload } from 'lucide-react';

interface UploadCardProps {
    onUpload: (file: File) => void;
    acceptedFileTypes?: string;
}

export default function UploadCard({ onUpload, acceptedFileTypes = '.pdf,.jpg,.jpeg,.png' }: UploadCardProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedFileTypes}
                className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
                <CloudUpload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Drag and drop or click to select
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    PDF, JPG, PNG up to 10MB
                </p>
            </div>
        </div>
    );
}
