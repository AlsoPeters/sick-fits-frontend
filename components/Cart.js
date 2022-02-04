import { useCart } from '../lib/cartState';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

function CartItem({ cartItem }) {
  const product = cartItem.product;
  if (!product) return null;
  return (
    <li className='grid grid-cols-2 px-2 py-1 my-4 border-b border-tokyo-term-magenta'>
      <img
        className='w-full col-span-1 mr-4'
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div className='mx-2'>
        <h3 className='text-2xl font-bold'>{product.name}</h3>
        <p className='col-start-2 font-bold'>
          {formatMoney(product.price * cartItem.quantity)} -
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <div className='col-start-3'>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </li>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <div className='mx-4 bg-tokyo-storm_BLK'>
      <header className='px-2 py-1 m-2 text-2xl font-bold border-2 rounded-sm bg-tokyo-term-black border-tokyo-term-magenta w-max'>
        {me.name}'s Cart
      </header>
      <button
        className='px-2 py-1 text-xl border-2 rounded-md border-tokyo-term-magenta bg-tokyo-term-black'
        onClick={closeCart}
      >
        &times;
      </button>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer className='flex flex-col w-full px-2 mx-2 text-3xl font-bold text-tokyo-term-green bg-tokyo-term-black'>
        {formatMoney(calcTotalPrice(me.cart))}
        <Checkout />
      </footer>
      {/* // TODO: Make slide in transition */}
    </div>
  );
}
