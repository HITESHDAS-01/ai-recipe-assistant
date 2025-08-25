import { useState, useEffect } from 'react';
import type { Recipe } from '../types';

const FAVORITES_STORAGE_KEY = 'ai-recipe-assistant-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (recipe: Recipe) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === recipe.id);
      if (isAlreadyFavorite) return prev;
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};