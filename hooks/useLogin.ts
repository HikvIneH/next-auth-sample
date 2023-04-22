import { gql, useMutation } from '@apollo/client';
import client from '../constants/apollo-client';
import authenticatedVar from '../constants/authenticated';

export interface LoginUserInput {
  loginUserInput: {
    email: string;
    password: string;
  };
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginOutput {
  user: User;
  access_token: string;
}

const LOGIN = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const useLogin = () => {
  return useMutation<LoginOutput, LoginUserInput>(LOGIN);
};
