import { useState, useEffect } from 'react';
import { Recipe } from '../types';

const FAVORITES_KEY = 'favoriteRecipes';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe: Recipe) => {
    const recipeWithId = {
      ...recipe,
      id: `${recipe.recipeName}-${Date.now()}`,
      isFavorite: true
    };
    setFavorites(prev => [...prev, recipeWithId]);
  };

  const removeFavorite = (recipeId: string) => {
    setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const isFavorite = (recipeName: string) => {
    return favorites.some(recipe => recipe.recipeName === recipeName);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};
