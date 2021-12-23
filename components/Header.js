import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="text-tokyo-term-blue bg-tokyo-night_BLK">
      <div className="grid grid-cols-3 items-center">
        <Link href="/">
          <h1 className="m-4 logo-primary hover:cursor-pointer">Sick Fits</h1>
        </Link>
        <div>
          <Nav />
        </div>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </header>
  );
}
