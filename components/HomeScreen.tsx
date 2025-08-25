
import React, { useState, useCallback } from 'react';
import { Language } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTheme } from '../hooks/useTheme';
import LanguageSelector from './LanguageSelector';
import MicButton from './MicButton';
import ThemeToggle from './ThemeToggle';

interface HomeScreenProps {
  onGetRecipe: (ingredients: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  error: string | null;
  onGoToFavorites: () => void;
  favoritesCount: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGetRecipe, language, setLanguage, error, onGoToFavorites, favoritesCount }) => {
  const [ingredients, setIngredients] = useState('');
  const { theme } = useTheme();

  const handleSpeechResult = useCallback((transcript: string) => {
    setIngredients(prev => prev ? `${prev} ${transcript}` : transcript);
  }, []);

  // Map app languages to speech recognition language codes
  const getLanguageCode = (lang: Language): string => {
    switch (lang) {
      case Language.English:
        return 'en-US';
      case Language.Hinglish:
        return 'hi-IN'; // Hindi (India) - best available for Hinglish
      case Language.Assamese:
        return 'hi-IN'; // Fallback to Hindi as Assamese isn't supported
      default:
        return 'en-US';
    }
  };

  const { isListening, isSupported, startListening } = useSpeechRecognition(handleSpeechResult, getLanguageCode(language));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetRecipe(ingredients);
  };

  return (
    <div className={`flex flex-col h-full p-8 justify-between transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900/30' 
        : 'bg-gradient-to-b from-white to-orange-50/30'
    }`}>
      <div className="text-center">
        <div className="mb-4 flex justify-between items-start">
          <ThemeToggle />
          <button 
            onClick={onGoToFavorites}
            className={`p-3 text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg relative ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favoritesCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg ${
                theme === 'dark' 
                  ? 'bg-yellow-500 text-yellow-900' 
                  : 'bg-yellow-400 text-yellow-900'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
        
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500 to-blue-500'
            : 'bg-gradient-to-r from-orange-400 to-pink-500'
        }`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        
        <h1 className={`text-4xl font-extrabold bg-clip-text text-transparent mb-4 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-400 to-blue-400'
            : 'bg-gradient-to-r from-orange-600 to-pink-600'
        }`}>AI Recipe Assistant</h1>
        <p className={`mb-8 text-lg font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>Transform your ingredients into culinary magic ✨</p>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-2xl blur-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400/20 to-blue-400/20'
              : 'bg-gradient-to-r from-orange-400/20 to-pink-400/20'
          }`}></div>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, onion, tomatoes, ginger..."
            className={`relative w-full h-40 p-6 pr-16 backdrop-blur-sm border-2 rounded-2xl focus:ring-4 transition-all duration-300 resize-none shadow-lg ${
              theme === 'dark'
                ? 'bg-gray-700/80 border-gray-600/50 focus:ring-purple-400/30 focus:border-purple-400 text-gray-200 placeholder-gray-500'
                : 'bg-white/80 border-orange-200/50 focus:ring-orange-400/30 focus:border-orange-400 text-gray-700 placeholder-gray-400'
            }`}
          />
          {isSupported && <MicButton isListening={isListening} onClick={startListening} />}
        </div>
        {!isSupported && (
          <p className={`text-xs text-center text-red-500 mt-2 p-2 rounded-lg ${
            theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
          }`}>
            Speech recognition is not supported in your browser.
          </p>
        )}
        {error && (
          <p className={`text-sm text-center mt-4 p-3 rounded-lg border ${
            theme === 'dark'
              ? 'text-red-400 bg-red-900/20 border-red-800'
              : 'text-red-600 bg-red-50 border-red-200'
          }`}>
            {error}
          </p>
        )}
      </form>

      <button
        onClick={handleSubmit}
        className={`w-full text-white font-bold py-5 rounded-2xl transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generate Recipe
        </span>
      </button>
    </div>
  );
};

export default HomeScreen;
