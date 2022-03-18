import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY, useUser } from './User';

export const SIGN_OUT_USER_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      type='button'
      onClick={signout}
      className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'
    >
      Sign Out
    </button>
  );
}
