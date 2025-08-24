import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteRecipesProps {
  onSelectRecipe: (recipe: any) => void;
}

export const FavoriteRecipes: React.FC<FavoriteRecipesProps> = ({ onSelectRecipe }) => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No favorite recipes yet
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      {favorites.map((recipe) => (
        <div 
          key={recipe.id} 
          className="bg-white rounded-lg shadow-md p-4 relative"
        >
          <h3 className="text-lg font-semibold mb-2">{recipe.recipeName}</h3>
          <p className="text-gray-600 text-sm mb-2">Time: {recipe.totalTime}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => onSelectRecipe(recipe)}
              className="text-orange-500 hover:text-orange-600"
            >
              View Recipe
            </button>
            <button
              onClick={() => removeFavorite(recipe.id!)}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
