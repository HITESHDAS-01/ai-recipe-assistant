import React from 'react';
import type { Recipe } from '../types';

interface FavoriteRecipesProps {
  favorites: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onGoBack: () => void;
  onRemoveFromFavorites: (recipeId: string) => void;
}

const FavoriteRecipes: React.FC<FavoriteRecipesProps> = ({ 
  favorites, 
  onSelectRecipe, 
  onGoBack, 
  onRemoveFromFavorites 
}) => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-orange-50/30">
      {/* Header */}
      <div className="p-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <button 
          onClick={onGoBack} 
          className="relative z-10 absolute top-6 left-6 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="relative z-10 text-center pt-4">
          <h1 className="text-3xl font-extrabold mb-2">My Favorite Recipes</h1>
          <p className="text-white/80">Your saved culinary treasures ❤️</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No favorites yet</h3>
            <p className="text-gray-500">Start adding recipes to your favorites to see them here!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {favorites.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    {recipe.recipeName}
                  </h3>
                  <button
                    onClick={() => onRemoveFromFavorites(recipe.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{recipe.totalTime}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {ingredient.split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onSelectRecipe(recipe)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 active:scale-98 shadow-lg"
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;