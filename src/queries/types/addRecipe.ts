/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addRecipe
// ====================================================

export interface addRecipe_addRecipe {
  __typename: "AddRecipeResponseGraphql";
  recipeId: number | null;
}

export interface addRecipe {
  addRecipe: addRecipe_addRecipe | null;
}

export interface addRecipeVariables {
  name: string;
  recipeType: string;
  ingredients: string;
  directions: string;
  rating?: number | null;
  ratingSet?: boolean | null;
  glassware?: string | null;
  tools?: string | null;
  garnish?: string | null;
  notes?: string | null;
  source?: string | null;
  sourceUrl?: string | null;
  attribution?: string | null;
}
