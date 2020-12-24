import Link from "next/link";

const Header = () => (
  <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-8 lg:px-0">
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
