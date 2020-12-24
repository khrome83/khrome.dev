import Link from "next/link";

const Header = () => (
  <nav className="flex items-center justify-between p-8">
    <Link href="/">
      <a className="text-indigo-600 no-underline text-accent-1 dark:text-indigo-500">
        Home
      </a>
    </Link>
    <Link href="/about">
      <a className="text-indigo-600 no-underline text-accent-1 dark:text-indigo-500">
        About Me
      </a>
    </Link>
  </nav>
);

export default Header;
