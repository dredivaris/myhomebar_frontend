import gql from 'graphql-tag';

export const GET_USER = gql`
  query me {
    me {
      id
      username
    }
  }
`;

export const USERS_RECIPES = gql`
  query usersRecipes {
    usersRecipes {
      name
      id
    }
  }
`;
