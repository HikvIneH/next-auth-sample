import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export function useLogout() {
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION, {
    onError: (error) => {
      console.error(error);
    },
    onCompleted: () => {
      console.log('Logged out successfully');
    },
  });

  const handleLogout = async () => {
    await logout();
  };

  return { handleLogout, loading, error };
}
