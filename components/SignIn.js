import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    await signin();

    resetForm();
    // Send the email and password to the graphqlAPI
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <form className="flex" method="POST" onSubmit={handleSubmit}>
      <fieldset className="px-2 border-2 rounded-sm border-tokyo-term-magenta">
        <h2 className="text-xl font-bold text-tokyo-term-white ">
          Sign In to Your Account
        </h2>
        <Error error={error} />
        <label className="flex flex-col my-2 font-bold" htmlFor="email">
          Email
          <input
            className="px-2 border rounded-sm text-tokyo-term-white bg-tokyo-comment_PURP border-tokyo-term-magenta"
            type="email"
            name="email"
            placeholder="Your Email Adress"
            autoComplete="email"
            value={inputs.value}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col my-2 font-bold" htmlFor="password">
          Password
          <input
            className="px-2 border rounded-sm text-tokyo-term-white bg-tokyo-comment_PURP border-tokyo-term-magenta"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button
          className="px-2 my-2 font-bold rounded-sm bg-tokyo-term-magenta text-tokyo-night_BLK"
          type="submit"
        >
          Sign In
        </button>
      </fieldset>
    </form>
  );
}
