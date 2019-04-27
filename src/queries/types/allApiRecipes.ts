/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allApiRecipes
// ====================================================

export interface allApiRecipes_allApiRecipes_nodes {
  __typename: "ApiRecipe";
  name: string;
  id: number;
}

export interface allApiRecipes_allApiRecipes {
  __typename: "ApiRecipesConnection";
  /**
   * A list of `ApiRecipe` objects.
   */
  nodes: (allApiRecipes_allApiRecipes_nodes | null)[];
}

export interface allApiRecipes {
  /**
   * Reads and enables pagination through a set of `ApiRecipe`.
   */
  allApiRecipes: allApiRecipes_allApiRecipes | null;
}
