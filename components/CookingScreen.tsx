import React, { useState, useEffect, useRef } from 'react';
import type { Recipe } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface CookingScreenProps {
  recipe: Recipe;
  onStopCooking: () => void;
  onGoHome: () => void;
}

const CookingScreen: React.FC<CookingScreenProps> = ({ recipe, onStopCooking, onGoHome }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<number | null>(null);
  const { speak, cancel } = useSpeechSynthesis();

  const currentStep = recipe.steps[currentStepIndex];

  useEffect(() => {
    speak(currentStep.action);
    if (currentStep.duration > 0) {
      setTimeLeft(currentStep.duration * 60);
    } else {
      setTimeLeft(0);
    }

    return () => {
      cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStepIndex, currentStep, speak, cancel]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Last step
      onStopCooking();
    }
  };

  const handleRepeatStep = () => {
    speak(currentStep.action);
  };
  
  const isLastStep = currentStepIndex === recipe.steps.length - 1;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-orange-50/30">
      <div className="p-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <button onClick={onStopCooking} className="relative z-10 absolute top-6 left-6 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={onGoHome} className="relative z-10 absolute top-6 right-6 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </button>
        <div className="relative z-10 text-center pt-4">
          <p className="text-white/80 mb-2">Step {currentStepIndex + 1} of {recipe.steps.length}</p>
          <h2 className="text-2xl font-extrabold">{recipe.recipeName}</h2>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        {timeLeft > 0 ? (
          <div className="mb-6">
            <p className="text-6xl font-mono font-bold text-orange-500">{formatTime(timeLeft)}</p>
            <p className="text-gray-600">{currentStep.alert}</p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-800">{currentStep.action}</p>
            <p className="text-gray-500 mt-2">{currentStep.alert}</p>
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <button
          onClick={handleRepeatStep}
          className="col-span-2 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 active:scale-98 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Repeat Step
          </span>
        </button>
        <button
          onClick={onStopCooking}
          className="py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 active:scale-98 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
          </span>
        </button>
        <button
          onClick={handleNextStep}
          className="py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 active:scale-98 shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isLastStep ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M13 7l5 5m0 0l-5 5m5-5H6"} />
            </svg>
            {isLastStep ? 'Finish' : 'Next Step'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CookingScreen;
