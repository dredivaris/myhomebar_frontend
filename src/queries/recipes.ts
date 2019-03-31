// Get the top stories from HackerNews

// GraphQL tag library, for creating GraphQL queries from plain template text
import gql from 'graphql-tag';

// ----------------------------------------------------------------------------

export default gql`
  query allApiRecipes {
    allApiRecipes {
      nodes {
        name
        id
      }
    }
  }
`;
