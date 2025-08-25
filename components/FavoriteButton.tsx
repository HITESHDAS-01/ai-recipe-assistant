import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg
        ${isFavorite 
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-300' 
          : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 border-2 border-gray-200 hover:border-red-300'
        }`}
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
  );
};

export default FavoriteButton;
