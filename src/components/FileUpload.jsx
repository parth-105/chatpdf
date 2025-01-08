import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import '../styles/animations.css';

export function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      setIsUploading(true);
      await onFileUpload(file);
      setIsUploading(false);
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onFileUpload(file);
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`upload-container w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
        isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {isUploading ? (
          <div className="upload-loading">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            <p className="mt-4 text-blue-500 animate-pulse">Uploading your PDF...</p>
          </div>
        ) : (
          <div className="upload-content fade-in">
            <Upload className="w-16 h-16 text-blue-500 hover:scale-110 transition-transform" />
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drop your PDF here
              </h3>
              <p className="text-gray-500 mb-4">or</p>
              <label className="cursor-pointer">
                <span className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
                  Choose File
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}