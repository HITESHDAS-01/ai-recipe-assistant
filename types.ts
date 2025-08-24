
export enum Language {
  Hinglish = 'Hinglish',
  Assamese = 'Assamese',
}

export enum AppScreen {
  Home = 'HOME',
  Recipe = 'RECIPE',
  Cooking = 'COOKING',
}

export interface RecipeStep {
  action: string;
  duration: number; // in minutes
  alert: string;
}

export interface Recipe {
  recipeName: string;
  totalTime: string;
  ingredients: string[];
  steps: RecipeStep[];
}
