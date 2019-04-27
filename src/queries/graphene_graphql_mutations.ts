import gql from 'graphql-tag';

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $name: String!
    $recipeType: String!
    $ingredients: String!
    $directions: String!
    $rating: Float
    $ratingSet: Boolean
    $glassware: String
    $tools: String
    $garnish: String
    $notes: String
    $source: String
    $sourceUrl: String
    $attribution: String
  ) {
    addRecipe(
      name: $name
      recipeType: $recipeType
      ingredients: $ingredients
      directions: $directions
      rating: $rating
      ratingSet: $ratingSet
      glassware: $glassware
      tools: $tools
      garnish: $garnish
      notes: $notes
      source: $source
      sourceUrl: $sourceUrl
      attribution: $attribution
    ) {
      recipeId
    }
  }
`;

export const LOGIN_USER = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $firstName: String
    $lastName: String
    $password: String!
    $username: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      user {
        id
        email
      }
    }
  }
`;