
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-20 h-20 border-4 border-orange-200/30 border-t-orange-500 rounded-full animate-spin shadow-lg"></div>
      <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-pink-500 rounded-full animate-spin animation-delay-150"></div>
      <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner;
