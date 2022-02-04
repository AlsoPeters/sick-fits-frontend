import Link from 'next/link';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

export default function Header() {
  return (
    <header className='text-tokyo-term-blue bg-tokyo-night_BLK'>
      <div className='grid items-center grid-cols-2'>
        <Link href='/'>
          <h1 className='m-4 logo-primary hover:cursor-pointer'>Sick Fits</h1>
        </Link>
        <div className='grid place-content-end'>
          <Nav />
        </div>
      </div>
      <div className='sub-bar'>
        <Search />
      </div>
      <Cart />
    </header>
  );
}
