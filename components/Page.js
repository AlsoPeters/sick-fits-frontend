import Header from "./Header";

export default function Page({ children }) {
  return (
    <div className="max-h-max bg-tokyo-night_BLK text-tokyo-term-blue">
      <Header />
      {children}
    </div>
  );
}
