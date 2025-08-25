
export enum Language {
  Hinglish = 'Hinglish',
  Assamese = 'Assamese',
}

export enum AppScreen {
  Home = 'HOME',
  Recipe = 'RECIPE',
  Cooking = 'COOKING',
  Favorites = 'FAVORITES',
}

export interface RecipeStep {
  action: string;
  duration: number; // in minutes
  alert: string;
}

export interface Recipe {
  id: string;
  recipeName: string;
  totalTime: string;
  ingredients: string[];
  steps: RecipeStep[];
}
