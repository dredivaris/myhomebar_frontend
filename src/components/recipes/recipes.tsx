import * as React from 'react';

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Recipes: React.FC = (props) => {
  console.log('props are', props);

  return (
    <>
      <h2>Recipe list loaded!</h2>
    </>
  );
};

export default Recipes;
