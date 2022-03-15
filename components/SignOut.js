import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY, useUser } from "./User";

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
      type="button"
      onClick={signout}
      className="px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer"
    >
      Sign Out
    </button>
  );
}
