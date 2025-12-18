
import React from 'react';
import { HeadshotStyle } from '../types';
import { HEADSHOT_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyleId: string | null;
  onStyleSelect: (style: HeadshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onStyleSelect }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-magic mr-2 text-indigo-500"></i>
        Choose Your Professional Style
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HEADSHOT_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`relative group overflow-hidden rounded-xl border-2 transition-all duration-300 text-left ${
              selectedStyleId === style.id
                ? 'border-indigo-600 ring-4 ring-indigo-50'
                : 'border-transparent hover:border-indigo-300'
            }`}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={style.previewUrl}
                alt={style.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <div className="flex items-center space-x-2 text-white">
                <i className={`fas ${style.icon} text-xs`}></i>
                <span className="text-sm font-bold truncate">{style.name}</span>
              </div>
              <p className="text-[10px] text-gray-200 line-clamp-1">{style.description}</p>
            </div>
            {selectedStyleId === style.id && (
              <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                <i className="fas fa-check text-[10px]"></i>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
