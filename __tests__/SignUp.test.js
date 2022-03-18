import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Signup, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();
const password = 'kyle';

const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: me } },
  },
];

describe('<SignUp/>', () => {
  it('Renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('Calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText('Dohn Joe'), me.name);
    await userEvent.type(
      screen.getByPlaceholderText('Your Email Adress'),
      me.email
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    // Click the submit
    await userEvent.click(screen.getByText('Sign Up'));
    await screen.findByText(
      `Signed up with ${me.email} - Please go head and sign in.`
    );
    debug();
  });
});
