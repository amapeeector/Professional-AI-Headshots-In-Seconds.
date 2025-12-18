
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileInputChange}
        />
        <div className="bg-indigo-100 p-4 rounded-full mb-4">
          <i className="fas fa-cloud-upload-alt text-indigo-600 text-3xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Upload a Selfie</h3>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Take a casual photo or select one from your gallery. Clear lighting works best!
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            Choose File
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
        <span className="flex items-center"><i className="fas fa-check-circle mr-1 text-green-500"></i> No professional gear needed</span>
        <span className="flex items-center"><i className="fas fa-check-circle mr-1 text-green-500"></i> AI identity matching</span>
      </div>
    </div>
  );
};

export default ImageUploader;
