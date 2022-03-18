import Link from 'next/link';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

export default function Header() {
  return (
    <header className='bg-tokyo-night_BLK'>
      <div className='grid grid-cols-2 items-center'>
        <Link href='/'>
          <h1 className='m-4 logo-primary hover:cursor-pointer'>Sick Fits</h1>
        </Link>
        <div className='grid place-content-end'>
          <Nav />
        </div>
      </div>
      <div className='ml-4'>
        <Search />
      </div>
      <Cart />
    </header>
  );
}
