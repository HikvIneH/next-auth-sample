import { gql, useMutation } from '@apollo/client';

export interface CreateUserInput {
  input: {
    email: string;
    password: string;
  };
}

interface User {
  id: string;
  email: string;
}

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      email
    }
  }
`;

export const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER);
};
