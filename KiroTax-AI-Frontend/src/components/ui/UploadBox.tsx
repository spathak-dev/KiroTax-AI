'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'

interface UploadBoxProps {
  onUpload: (files: File[]) => void
  isUploading: boolean
}

export default function UploadBox({ onUpload, isUploading }: UploadBoxProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 bg-gray-50'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="text-primary-600" size={32} />
          </div>
          
          {isDragActive ? (
            <p className="text-lg font-medium text-primary-600">Drop files here...</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-sm text-gray-600">
                Supports PDF, JPG, PNG (max 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Selected Files</h3>
          <div className="space-y-2">
            {acceptedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <File className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                {isUploading && (
                  <div className="text-sm text-primary-600">Uploading...</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
