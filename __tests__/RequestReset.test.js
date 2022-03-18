import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'Kyle.fire@gmail.com';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('Renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the mutation when submitted', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // Type into the email box
    userEvent.type(screen.getByPlaceholderText(/your email adress/i), email);
    // Click submit
    userEvent.click(screen.getByText(/request reset/i));
    const success = await screen.findByText(/success/i);
  });
});
