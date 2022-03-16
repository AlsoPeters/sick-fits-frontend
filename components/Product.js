import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
  return (
    <div className="z-10 flex flex-col text-2xl font-bold border-4 rounded-sm border-tokyo-term-magenta">
      <div className="z-0">
        <img
          className="object-cover w-full h-96"
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
      </div>
      <div className="p-2 m-auto text-center border-4 rounded-sm w-max border-tokyo-term-magenta align-center bg-tokyo-term-black">
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </div>
      <div>{formatMoney(product.price)}</div>
      <p>{product.description}</p>
      <div className="flex justify-center mx-4 my-2">
        <div className="px-2 py-1 font-bold border-2 rounded-md bg-tokyo-term-black border-tokyo-term-magenta">
          <Link
            href={{
              pathname: 'update',
              query: {
                id: product.id,
              },
            }}
          >
            Edit
          </Link>
        </div>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </div>
  );
}
