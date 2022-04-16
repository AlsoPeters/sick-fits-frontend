import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
  return (
    <div className="z-10 flex-col w-96 text-2xl font-bold rounded-sm border-4 border-tokyo-term-magenta">
      <div className="z-0">
        <img
          className="object-cover w-96 h-96"
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
      </div>
      <div className="p-2 m-auto w-max text-center rounded-sm border-4 border-tokyo-term-magenta align-center bg-tokyo-term-black">
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </div>
      <div>{formatMoney(product.price)}</div>
      <p>{product.description}</p>
      <div className="flex justify-center my-2 mx-4">
        <div className="py-1 px-2 font-bold rounded-md border-2 bg-tokyo-term-black border-tokyo-term-magenta">
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
