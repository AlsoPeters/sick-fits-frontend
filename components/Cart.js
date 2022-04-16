import { useCart } from '../lib/cartState'
import { useUser } from './User'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import RemoveFromCart from './RemoveFromCart'
import { Checkout } from './Checkout'

function CartItem({ cartItem }) {
  const product = cartItem.product
  if (!product) return null
  return (
    <li className='  grid grid-cols-2 py-1 px-2 my-4 border-b border-tokyo-term-magenta'>
      <img
        className='col-span-1 mr-4 w-full'
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
  )
}

export default function Cart() {
  const me = useUser()
  const { cartOpen, closeCart } = useCart()
  if (!me) return null
  return (
    <div
      className={
        cartOpen === false
          ? 'fixed -right-full z-50 w-1/4 rounded-md border-2 mx-6x-4 border-tokyo-term-magenta bg-tokyo-storm_BLK'
          : 'fixed right-4 z-50 w-96 rounded-md border-2 max-h-lg  mx-6x-4 border-tokyo-term-magenta bg-tokyo-storm_BLK'
      }
    >
      <div className='flex justify-center'>
        <header className='absolute -top-7 left-5 px-2 m-2 w-max text-3xl font-bold rounded-md border-2 bg-tokyo-term-black border-tokyo-term-magenta'>
          {me.name}'s Cart
        </header>
        <button
          className='absolute -top-7 right-6 px-2 py-1  mt-2 text-xl rounded-md border-2 h-max border-tokyo-term-magenta bg-tokyo-term-black'
          onClick={closeCart}
        >
          &times;
        </button>
      </div>
      <ul className='mt-2 w-auto h-80 overflow-auto'>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer className='flex  flex-col p-2 px-2 w-full text-3xl font-bold text-tokyo-term-green bg-tokyo-term-black'>
        <div className='ml-2'>{formatMoney(calcTotalPrice(me.cart))}</div>
        <Checkout />
      </footer>
      {/* // TODO: Make slide in transition */}
    </div>
  )
}
