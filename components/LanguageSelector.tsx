
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = [Language.Hinglish, Language.Assamese];

  return (
    <div className="flex justify-center space-x-3 mb-8">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onSelectLanguage(lang)}
          className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105
            ${selectedLanguage === lang 
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-xl border-2 border-orange-300' 
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-gray-200 hover:border-orange-300 shadow-lg'
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
