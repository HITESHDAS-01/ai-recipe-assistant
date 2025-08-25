
import React, { useState, useCallback } from 'react';
import { AppScreen, Language, Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import { useFavorites } from './hooks/useFavorites';
import HomeScreen from './components/HomeScreen';
import RecipeScreen from './components/RecipeScreen';
import CookingScreen from './components/CookingScreen';
import FavoriteRecipes from './components/FavoriteRecipes';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Home);
  const [language, setLanguage] = useState<Language>(Language.English);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites, isFavorite, toggleFavorite, removeFromFavorites } = useFavorites();

  const handleGetRecipe = useCallback(async (ingredients: string) => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients, language);
      // Add unique ID to recipe
      const recipeWithId = {
        ...generatedRecipe,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      setRecipe(recipeWithId);
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

  const handleGoToFavorites = () => {
    setCurrentScreen(AppScreen.Favorites);
  };

  const handleSelectFavoriteRecipe = (favoriteRecipe: Recipe) => {
    setRecipe(favoriteRecipe);
    setCurrentScreen(AppScreen.Recipe);
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-orange-50/30 p-8">
            <LoadingSpinner />
            <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent animate-pulse">Brewing up a tasty recipe for you...</p>
            <div className="mt-4 flex space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            </div>
        </div>
      );
    }

    switch (currentScreen) {
      case AppScreen.Recipe:
        return (
          <RecipeScreen 
            recipe={recipe!} 
            onStartCooking={handleStartCooking} 
            onGoBack={handleGoHome}
            isFavorite={recipe ? isFavorite(recipe.id) : false}
            onToggleFavorite={() => recipe && toggleFavorite(recipe)}
          />
        );
      case AppScreen.Cooking:
        return <CookingScreen recipe={recipe!} onStopCooking={handleStopCooking} onGoHome={handleGoHome} />;
      case AppScreen.Favorites:
        return (
          <FavoriteRecipes
            favorites={favorites}
            onSelectRecipe={handleSelectFavoriteRecipe}
            onGoBack={handleGoHome}
            onRemoveFromFavorites={removeFromFavorites}
          />
        );
      case AppScreen.Home:
      default:
        return (
          <HomeScreen
            onGetRecipe={handleGetRecipe}
            language={language}
            setLanguage={setLanguage}
            error={error}
            onGoToFavorites={handleGoToFavorites}
            favoritesCount={favorites.length}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden min-h-[85vh] flex flex-col">
        {renderScreen()}
        <div className="p-4 text-center border-t border-orange-200/30">
          <p className="text-xs text-gray-500 font-medium">
            Created by{' '}
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">
              Pranjit Das
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
