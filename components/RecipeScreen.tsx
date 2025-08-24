
import React from 'react';
import type { Recipe } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface RecipeScreenProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onGoBack: () => void;
}

const RecipeScreen: React.FC<RecipeScreenProps> = ({ recipe, onStartCooking, onGoBack }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isRecipeFavorite = isFavorite(recipe.recipeName);

  const toggleFavorite = () => {
    if (isRecipeFavorite) {
      removeFavorite(recipe.id!);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="flex flex-col h-full">
        <div className="p-6 bg-orange-500 text-white relative">
            <button onClick={onGoBack} className="absolute top-4 left-4 p-2 rounded-full hover:bg-orange-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button 
              onClick={toggleFavorite}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-orange-600 transition"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={isRecipeFavorite ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-center mt-2">{recipe.recipeName}</h1>
            <div className="flex items-center justify-center mt-3 text-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{recipe.totalTime}</span>
            </div>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
        
        <div className="p-6 border-t border-gray-200">
            <button
                onClick={onStartCooking}
                className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-transform duration-200 active:scale-95 shadow-lg"
            >
                Start Cooking
            </button>
        </div>
    </div>
  );
};

export default RecipeScreen;
