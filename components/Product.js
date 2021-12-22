import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  return (
    <div className="flex z-10 flex-col text-2xl font-bold rounded-sm border-4 border-tokyo-term-magenta">
      <div className="z-0">
        <img
          className="object-cover w-full h-96"
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product.name}
        />
      </div>
      <div className="p-2 m-auto w-max text-center rounded-sm border-4 border-tokyo-term-magenta align-center bg-tokyo-term-black">
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </div>
      <div>{formatMoney(product.price)}</div>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete items  */}
    </div>
  );
}
