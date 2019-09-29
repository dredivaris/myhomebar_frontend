import Recipe from '@/components/recipes/recipe';
import { USERS_RECIPES_FULL } from '@/queries/graphene_graphql_queries';
import { List, Typography } from '@material-ui/core';
import * as React from 'react';
import { Query } from 'react-apollo';

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Recipes: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel: any) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Query query={USERS_RECIPES_FULL}>
      {(result) => {
        // if (result.data && result.data.usersRecipes) {
        //   const beverages = result.data.usersRecipes;
        // }

        // Any errors? Say so!
        if (result.error) {
          return <h1>Error retrieving units! &mdash; {result.error}</h1>;
        }

        // If the data is still loading, return with a basic
        // message to alert the user
        if (result.loading) {
          return <h1>Loading units ...</h1>;
        }
        // const name = result.data!.allApiUnits!.nodes[0]!.name;
        // const {
        //   data: {
        //     allApiUnits: { nodes },
        //   },
        // } = result;

        // Otherwise, we have data to work with... map over it with a
        // bullet-point list

        return (
          <>
            <div>
              {result.data &&
                result.data.usersRecipes &&
                result.data.usersRecipes.map((recipe: any) => {
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
