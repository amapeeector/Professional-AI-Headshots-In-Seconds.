
import React, { useState } from 'react';

interface EditToolsProps {
  onApplyEdit: (instruction: string) => void;
  isLoading: boolean;
}

const PRESET_EDITS = [
  "Add a warm vintage filter",
  "Remove any people in the background",
  "Adjust for more brightness",
  "Make the attire more formal",
  "Add a subtle vignette",
  "Enhance facial details"
];

const EditTools: React.FC<EditToolsProps> = ({ onApplyEdit, isLoading }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim() && !isLoading) {
      onApplyEdit(customPrompt.trim());
      setCustomPrompt('');
    }
  };

  return (
    <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-sliders-h mr-2 text-indigo-500"></i>
        Refine with AI Instructions
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESET_EDITS.map((edit) => (
          <button
            key={edit}
            onClick={() => onApplyEdit(edit)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            {edit}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="E.g. 'Add a blue tie' or 'Remove the light glare'"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-100 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
             <i className="fas fa-magic text-gray-300"></i>
          </div>
        </div>
        <button
          type="submit"
          disabled={!customPrompt.trim() || isLoading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-100 flex items-center justify-center"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-paper-plane mr-2"></i>
          )}
          Apply Refinement
        </button>
      </form>
    </div>
  );
};

export default EditTools;
