import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex w-max text-3xl font-bold rounded-md border-4 border-tokyo-term-magenta">
      <Link href="/products">
        <p className="py-4 px-6 border-r-4 border-r-tokyo-term-magenta hover:cursor-pointer">
          Products
        </p>
      </Link>
      <Link href="/sell">
        <p className="py-4 px-6 border-r-4 border-r-tokyo-term-magenta hover:cursor-pointer">
          Sell
        </p>
      </Link>
      <Link href="/orders">
        <p className="py-4 px-6 border-r-4 border-r-tokyo-term-magenta hover:cursor-pointer">
          Orders
        </p>
      </Link>
      <Link href="/account">
        <p className="py-4 px-6 hover:cursor-pointer">Account</p>
      </Link>
    </nav>
  );
}
