import Recipe from '@/components/recipes/recipe';
import { USERS_RECIPES_FULL } from '@/queries/graphene_graphql_queries';
import * as React from 'react';
import { Query } from 'react-apollo';
// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Recipes: React.FC = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const { filterText } = props;

  const handleChange = (panel: any) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Query query={USERS_RECIPES_FULL}>
      {(result) => {
        // Any errors? Say so!
        if (result.error) {
          return <h1>Error retrieving units! &mdash; {result.error}</h1>;
        }

        // If the data is still loading, return with a basic
        // message to alert the user
        if (result.loading) {
          return <h1>Loading units ...</h1>;
        }

        // Otherwise, we have data to work with... map over it with a
        // bullet-point list
        function inName(recipe, text) {
          return recipe.name.toLowerCase().includes(text);
        }
        function inIngredient(recipe, text) {
          for (const ingredient of recipe.ingredients) {
            if (ingredient.toLowerCase().includes(text)) {
              return true;
            }
          }
          return false;
        }
        const recipesFiltered = result.data.usersRecipes.filter((recipe: any) => {
          if (filterText.length > 0) {
            let text = filterText.toLowerCase();
            return inName(recipe, text) || inIngredient(recipe, text);
          } else return true;
        });
        return (
          <>
            <div>
              {recipesFiltered.map((recipe: any) => {
                  return (
                    <Recipe usersRecipe={recipe} handleChange={handleChange} expanded={expanded} />
                  );
                })}
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default Recipes;
