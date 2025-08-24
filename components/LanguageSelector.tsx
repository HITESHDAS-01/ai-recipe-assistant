
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = [Language.Hinglish, Language.Assamese];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onSelectLanguage(lang)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
            ${selectedLanguage === lang 
              ? 'bg-orange-500 text-white shadow-lg scale-105' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
