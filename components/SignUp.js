import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function signup() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
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
        {data?.createUser && (
          <p className="my-2 text-xl font-bold text-tokyo-term-green">
            Signed up with {data.createUser.email} - Please go head and sign in.
          </p>
        )}
        <h2 className="text-xl font-bold text-tokyo-term-white ">
          Sign Up For an Account
        </h2>
        <Error error={error} />
        <label className="flex flex-col my-2 font-bold" htmlFor="email">
          Your Name
          <input
            className="px-2 border rounded-sm text-tokyo-term-white bg-tokyo-comment_PURP border-tokyo-term-magenta"
            type="text"
            name="name"
            placeholder="Dohn Joe"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
          Sign Up
        </button>
      </fieldset>
    </form>
  );
}

export { SIGNUP_MUTATION };
