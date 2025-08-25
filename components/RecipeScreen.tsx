
import React from 'react';
import type { Recipe } from '../types';

interface RecipeScreenProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onGoBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RecipeScreen: React.FC<RecipeScreenProps> = ({ recipe, onStartCooking, onGoBack, isFavorite, onToggleFavorite }) => {
  return (
    <div className="flex flex-col h-full">
        <div className="p-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <button onClick={onGoBack} className="relative z-10 absolute top-6 left-6 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button 
                onClick={onToggleFavorite} 
                className="relative z-10 absolute top-6 right-6 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill={isFavorite ? "currentColor" : "none"} 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                    />
                </svg>
            </button>
            <div className="relative z-10 text-center pt-4">
                <h1 className="text-3xl font-extrabold mb-4">{recipe.recipeName}</h1>
                <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl p-3 inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="font-semibold">{recipe.totalTime}</span>
                </div>
            </div>
        </div>

        <div className="p-8 flex-grow overflow-y-auto bg-gradient-to-b from-white to-orange-50/30">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-orange-200/50">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center">
                    <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Ingredients
                </h2>
                <div className="grid gap-3">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-200/50">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mr-4"></div>
                            <span className="text-gray-700 font-medium">{ingredient}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="p-8 bg-gradient-to-b from-white to-orange-50/30">
            <button
                onClick={onStartCooking}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-5 rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 active:scale-98 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
                <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Cooking
                </span>
            </button>
        </div>
    </div>
  );
};

export default RecipeScreen;
