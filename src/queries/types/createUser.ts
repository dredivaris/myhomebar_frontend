/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user {
  __typename: "UserType";
  id: string;
  email: string;
}

export interface createUser_createUser {
  __typename: "CreateUser";
  user: createUser_createUser_user | null;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  username: string;
}
