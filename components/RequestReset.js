import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });

    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <form className="flex" method="POST" onSubmit={handleSubmit}>
      <fieldset className="px-2 border-2 rounded-sm border-tokyo-term-magenta">
        {data?.sendUserPasswordResetLink === null && (
          <p className="my-2 text-xl font-bold text-tokyo-term-green">
            Success! Check your email for a link.
          </p>
        )}
        <h2 className="text-xl font-bold text-tokyo-term-white ">
          Request a Password Reset
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

        <button
          className="px-2 my-2 font-bold rounded-sm bg-tokyo-term-magenta text-tokyo-night_BLK"
          type="submit"
        >
          Request Reset
        </button>
      </fieldset>
    </form>
  );
}
