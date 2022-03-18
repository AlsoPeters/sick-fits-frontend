import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished with the order.`);
    console.log(order);
    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });
    // 7. Close the cart
    closeCart();
    // 8. Turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-auto p-4 mx-2 my-1 border-2 border-tokyo-term-magenta"
    >
      {error && <p className="text-xl text-tokyo-term-red">{error.message}</p>}
      {graphQLError && (
        <p className="text-xl text-tokyo-term-red">{graphQLError.message}</p>
      )}

      <p>hello</p>
      <CardElement />
      <button className="w-full px-2 py-1 text-base font-bold border-2 bg-tokyo-night_BLK border-tokyo-term-magenta">
        Check Out Now
      </button>
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
