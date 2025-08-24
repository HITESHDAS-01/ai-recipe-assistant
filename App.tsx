
import React, { useState, useCallback } from 'react';
import { AppScreen, Language, Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import HomeScreen from './components/HomeScreen';
import RecipeScreen from './components/RecipeScreen';
import CookingScreen from './components/CookingScreen';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Home);
  const [language, setLanguage] = useState<Language>(Language.Hinglish);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecipe = useCallback(async (ingredients: string) => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients, language);
      setRecipe(generatedRecipe);
      setCurrentScreen(AppScreen.Recipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate a recipe. The AI might be busy, or the ingredients are too unusual. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const handleStartCooking = () => {
    if (recipe) {
      setCurrentScreen(AppScreen.Cooking);
    }
  };

  const handleStopCooking = () => {
    setCurrentScreen(AppScreen.Recipe);
  };

  const handleGoHome = () => {
    setCurrentScreen(AppScreen.Home);
    setRecipe(null);
    setError(null);
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 animate-pulse">Brewing up a tasty recipe for you...</p>
        </div>
      );
    }

    switch (currentScreen) {
      case AppScreen.Recipe:
        return <RecipeScreen recipe={recipe!} onStartCooking={handleStartCooking} onGoBack={handleGoHome} />;
      case AppScreen.Cooking:
        return <CookingScreen recipe={recipe!} onStopCooking={handleStopCooking} />;
      case AppScreen.Home:
      default:
        return (
          <HomeScreen
            onGetRecipe={handleGetRecipe}
            language={language}
            setLanguage={setLanguage}
            error={error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[80vh] flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
