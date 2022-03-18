export default function CartCount({ count }) {
  return (
    <div className="p-2 mx-2 text-base font-bold leading-4 rounded-full tabular-nums h-min min-w-fit bg-tokyo-term-black">
      {count}
    </div>
  );
}
