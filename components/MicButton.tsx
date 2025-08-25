
import React from 'react';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ isListening, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg
      ${isListening 
        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-300' 
        : 'bg-gradient-to-r from-orange-400 to-pink-400 text-white hover:from-orange-500 hover:to-pink-500 shadow-orange-300'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v1a7 7 0 01-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    </button>
  );
};

export default MicButton;
