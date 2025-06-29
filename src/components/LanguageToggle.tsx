import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'tr' | 'en';
  onToggle: (lang: 'tr' | 'en') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => onToggle('tr')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            currentLang === 'tr'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          TR
        </button>
        <button
          onClick={() => onToggle('en')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            currentLang === 'en'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;