
import React, { useState, useCallback } from 'react';
import { Language } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import LanguageSelector from './LanguageSelector';
import MicButton from './MicButton';

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

  const handleSpeechResult = useCallback((transcript: string) => {
    setIngredients(prev => prev ? `${prev} ${transcript}` : transcript);
  }, []);

  const { isListening, isSupported, startListening } = useSpeechRecognition(handleSpeechResult);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetRecipe(ingredients);
  };

  return (
    <div className="flex flex-col h-full p-8 bg-gradient-to-b from-white to-orange-50/30 justify-between">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1"></div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">AI Recipe Assistant</h1>
          <button
            onClick={onGoToFavorites}
            className="relative p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-orange-200/50 hover:border-orange-300 transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
        <p className="text-gray-600 mb-8 text-lg font-medium">Transform your ingredients into culinary magic ✨</p>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-2xl blur-xl"></div>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, onion, tomatoes, ginger..."
            className="relative w-full h-40 p-6 pr-16 bg-white/80 backdrop-blur-sm border-2 border-orange-200/50 rounded-2xl focus:ring-4 focus:ring-orange-400/30 focus:border-orange-400 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 shadow-lg"
          />
          {isSupported && <MicButton isListening={isListening} onClick={startListening} />}
        </div>
        {!isSupported && <p className="text-xs text-center text-red-500 mt-2 bg-red-50 p-2 rounded-lg">Speech recognition is not supported in your browser.</p>}
        {error && <p className="text-sm text-center text-red-600 mt-4 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
      </form>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-5 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
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
