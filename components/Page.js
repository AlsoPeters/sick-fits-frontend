import Header from "./Header";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2 className="font-bold">I am the page component</h2>
      {children}
    </div>
  );
}
