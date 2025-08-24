import React, { useState, useEffect, useRef } from 'react';
import type { Recipe } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface CookingScreenProps {
  recipe: Recipe;
  onStopCooking: () => void;
}

const CookingScreen: React.FC<CookingScreenProps> = ({ recipe, onStopCooking }) => {
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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-orange-500 text-white text-center">
        <p className="text-sm">Step {currentStepIndex + 1} of {recipe.steps.length}</p>
        <h2 className="text-lg font-bold">{recipe.recipeName}</h2>
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

      <div className="p-4 grid grid-cols-2 gap-4 border-t border-gray-200">
        <button
          onClick={handleRepeatStep}
          className="col-span-2 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          Repeat Step
        </button>
        <button
          onClick={onStopCooking}
          className="py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Stop
        </button>
        <button
          onClick={handleNextStep}
          className="py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          {isLastStep ? 'Finish' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default CookingScreen;
