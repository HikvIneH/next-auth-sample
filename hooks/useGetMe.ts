import { gql, useQuery } from '@apollo/client';
import { getCookie } from 'cookies-next';

const GET_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery(GET_ME, { errorPolicy: 'all' });
};

export default useGetMe;
