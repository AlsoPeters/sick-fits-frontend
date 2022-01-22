import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log(error);

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });

    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <form className='flex' method='POST' onSubmit={handleSubmit}>
      <fieldset className='px-2 border-2 rounded-sm border-tokyo-term-magenta'>
        {data?.redeemUserPasswordResetToken === null && (
          <p className='my-2 text-xl font-bold text-tokyo-term-green'>
            Success! You can now sign in.
          </p>
        )}
        <h2 className='text-xl font-bold text-tokyo-term-white '>
          Reset Your Password
        </h2>
        <Error error={error || successfulError} />

        <label className='flex flex-col my-2 font-bold' htmlFor='email'>
          Email
          <input
            className='px-2 border rounded-sm text-tokyo-term-white bg-tokyo-comment_PURP border-tokyo-term-magenta'
            type='email'
            name='email'
            placeholder='Your Email Adress'
            autoComplete='email'
            value={inputs.value}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col my-2 font-bold' htmlFor='password'>
          Password
          <input
            className='px-2 border rounded-sm text-tokyo-term-white bg-tokyo-comment_PURP border-tokyo-term-magenta'
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button
          className='px-2 my-2 font-bold rounded-sm bg-tokyo-term-magenta text-tokyo-night_BLK'
          type='submit'
        >
          Request Reset
        </button>
      </fieldset>
    </form>
  );
}
