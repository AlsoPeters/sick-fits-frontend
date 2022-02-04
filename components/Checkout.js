import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements } from '@stripe/react-stripe-js';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Checkout() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('We gotta do some work..');
  }

  return (
    <Elements stripe={stripeLib}>
      <form
        onSubmit={handleSubmit}
        className='w-auto p-4 mx-2 my-1 border-2 border-tokyo-term-magenta'
      >
        <CardElement />
        <button className='w-full px-2 py-1 text-base font-bold border-2 bg-tokyo-night_BLK border-tokyo-term-magenta'>
          Check Out Now
        </button>
      </form>
    </Elements>
  );
}
