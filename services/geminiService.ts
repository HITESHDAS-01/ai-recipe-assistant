
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, Language } from '../types';

// @ts-ignore
const API_KEY = window.__VITE_GEMINI_API_KEY__;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: 'The name of the recipe.',
    },
    totalTime: {
      type: Type.STRING,
      description: 'Total estimated cooking time, e.g., "30 minutes".',
    },
    ingredients: {
      type: Type.ARRAY,
      description: 'List of all ingredients with quantities.',
      items: {
        type: Type.STRING,
      },
    },
    steps: {
      type: Type.ARRAY,
      description: 'The step-by-step cooking instructions.',
      items: {
        type: Type.OBJECT,
        properties: {
          action: {
            type: Type.STRING,
            description: 'Clear, concise action for this step.',
          },
          duration: {
            type: Type.INTEGER,
            description: 'The waiting time in minutes for this step. Use 0 if no waiting is needed.',
          },
          alert: {
            type: Type.STRING,
            description: 'A short message about the waiting period, e.g., "Wait for 5 minutes" or "No waiting needed".',
          },
        },
        required: ["action", "duration", "alert"],
      },
    },
  },
  required: ["recipeName", "totalTime", "ingredients", "steps"],
};

export async function generateRecipe(ingredients: string, language: Language): Promise<Recipe> {
  const prompt = `
    You are a helpful cooking assistant. Your task is to create one simple and easy-to-follow recipe.

    RULES:
    1.  Use ONLY the following ingredients: ${ingredients}.
    2.  You can assume the user has basic staples: salt, pepper, oil, and water. Do not use any other ingredients.
    3.  The recipe should be very simple and suitable for a beginner cook.
    4.  The output language MUST be ${language}.
    5.  Provide the output strictly in the specified JSON format.

    Generate the recipe now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation
    if (!recipeData.recipeName || !Array.isArray(recipeData.steps) || recipeData.steps.length === 0) {
        throw new Error("Received invalid recipe structure from AI.");
    }
    
    return recipeData as Recipe;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI recipe generator.");
  }
}
