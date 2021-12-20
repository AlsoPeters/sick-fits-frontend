import Link from "next/link";
import formatMoney from "../lib/formatMoney";

export default function Product({ product }) {
  return (
    <div className="text-2xl font-bold">
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </div>
      <div>{formatMoney(product.price)}</div>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete items  */}
    </div>
  );
}
