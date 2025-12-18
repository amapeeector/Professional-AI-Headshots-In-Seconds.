
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-camera-retro text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              LuminaShot AI
            </h1>
          </div>
          <div className="flex space-x-4">
            <span className="hidden sm:inline-block text-sm font-medium text-gray-500">
              Professional Photographer in your pocket
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
