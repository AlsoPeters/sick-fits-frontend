import Link from 'next/link';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  console.log(user);
  return (
    <nav className='flex mx-4 text-3xl font-bold w-max'>
      <Link href='/products'>
        <p className='px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer'>
          Products
        </p>
      </Link>
      {user && (
        <>
          <Link href='/sell'>
            <p className='px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer'>
              Sell
            </p>
          </Link>
          <Link href='/orders'>
            <p className='px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer'>
              Orders
            </p>
          </Link>
          <Link href='/account'>
            <p className='px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer'>
              Account
            </p>
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>
            <p className='px-6 py-4 mx-2 border-4 rounded-md border-tokyo-term-magenta hover:cursor-pointer'>
              Sign In
            </p>
          </Link>
        </>
      )}
    </nav>
  );
}
