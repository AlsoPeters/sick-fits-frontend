import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <nav className='flex mx-4 w-max text-3xl font-bold'>
      <Link href='/products'>
        <p className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'>
          Products
        </p>
      </Link>
      {user && (
        <>
          <Link href='/sell'>
            <p className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'>
              Sell
            </p>
          </Link>
          <Link href='/orders'>
            <p className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'>
              Orders
            </p>
          </Link>
          <Link href='/account'>
            <p className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'>
              Account
            </p>
          </Link>
          <SignOut />
          <div className='flex items-center'>
            <button
              className='flex py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'
              type='button'
              onClick={openCart}
            >
              My Cart
              <CartCount
                count={user.cart.reduce(
                  (tally, cartItem) =>
                    tally + (cartItem.product ? cartItem.quantity : 0),
                  0
                )}
              />
            </button>
          </div>
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>
            <p className='py-4 px-6 mx-2 rounded-md border-2 border-tokyo-term-magenta hover:cursor-pointer'>
              Sign In
            </p>
          </Link>
        </>
      )}
    </nav>
  );
}
