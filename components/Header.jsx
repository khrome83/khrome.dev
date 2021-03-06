import Link from "next/link";

const Header = () => (
  <nav className="max-w-7xl mx-auto flex items-center justify-around content-around p-4 md:p-8">
    <Link href="/">
      <a className="text-purple-600 no-underline text-accent-1 dark:text-purple-500">
        Home
      </a>
    </Link>
    <Link href="/">
      <a>
        <span className="sr-only">Home</span>
        <img
          src="/logo-transparent.png"
          alt="Khrome.dev logo - Bald skeleton with luscious beard in purple."
          width="120"
          height="120"
        />
      </a>
    </Link>
    <Link href="/about">
      <a className="text-purple-600 no-underline text-accent-1 dark:text-purple-500">
        About Me
      </a>
    </Link>
  </nav>
);

export default Header;
