/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: tokenAuth
// ====================================================

export interface tokenAuth_tokenAuth {
  __typename: "ObtainJSONWebToken";
  token: string | null;
}

export interface tokenAuth {
  tokenAuth: tokenAuth_tokenAuth | null;
}

export interface tokenAuthVariables {
  username: string;
  password: string;
}
