// ReactQL example page - delete this folder for your own project!

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

import * as React from 'react';

/* Local */

// Counter, controlled by local Apollo state
// import Count from './count';

// Hacker News GraphQL example
// import HackerNews from "./hackernews";
// import NewExample from './new_example';

// ----------------------------------------------------------------------------

interface IIndexState {
  recipes: React.FC | null;
}

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
class RecipesContainer extends React.PureComponent<{}, IIndexState> {
  public state = {
    recipes: null,
  };

  public componentDidMount = async () => {
    // Fetch the component dynamically
    const recipes = await import('./recipes');

    // ... and keep a hold of it locally
    this.setState({
      recipes: recipes.default,
    });
  };

  public render() {
    const RecipesComponent = this.state.recipes || (() => <h2>Loading...</h2>);

    return (
      <>
        {/* Note: The <h1> style will have a yellow background due to @/global/styles.ts! */}
        <h1>HomeBar</h1>
        <RecipesComponent />
        {/*<Count />*/}
        {/*<NewExample />*/}
      </>
    );
  }
}

export default RecipesContainer;
