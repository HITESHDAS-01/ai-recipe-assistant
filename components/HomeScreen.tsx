
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
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGetRecipe, language, setLanguage, error }) => {
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
    <div className="flex flex-col h-full p-6 bg-white justify-between">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Recipe Assistant</h1>
        <p className="text-gray-500 mb-6">What ingredients do you have today?</p>
        <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      </div>

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center">
        <div className="relative">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, onion, tomatoes, ginger..."
            className="w-full h-36 p-4 pr-14 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors duration-300 resize-none"
          />
          {isSupported && <MicButton isListening={isListening} onClick={startListening} />}
        </div>
        {!isSupported && <p className="text-xs text-center text-red-500 mt-2">Speech recognition is not supported in your browser.</p>}
        {error && <p className="text-sm text-center text-red-600 mt-4">{error}</p>}
      </form>

      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-transform duration-200 active:scale-95 shadow-lg"
      >
        Get Recipe
      </button>
    </div>
  );
};

export default HomeScreen;
