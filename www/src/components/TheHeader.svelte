<script>
  // import logo from "../../static/Horizontal Logo/Black & Green.svg";
  // import SearchInput from "../components/SearchInput";

  import menu from "../../static/menu.svg";

  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
  };
</script>

<header>
  <nav
    class="container mx-auto flex flex-wrap justify-between items-center py-8">
    <div>
      <a href="/">
        <img src="logo.svg" class="w-16 lg:w-20" alt="logo" />
      </a>
    </div>
    <div class="block lg:hidden">
      <button
        on:click={toggle}
        aria-label="Menu"
        class="flex items-center px-3 py-2 border rounded border-gray-500
        hover:text-gray-700 hover:underline hover:border-gray-600">
        {@html menu}
      </button>
    </div>
    <ul
      class="uppercase tracking-wide font-bold w-full block flex-grow mb-0
      overflow-y-hidden lg:flex lg:flex-initial lg:w-auto items-center
      lg:overflow-auto lg:max-h-screen transition-all transition-ease pl-0"
      class:max-h-screen={isOpen}
      class:max-h-none={!isOpen}>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:my-0 list-none">
        <a
          href="/#works"
          class="text-base text-black hover:text-gray-700 hover:underline">
          Works
        </a>
      </li>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:my-0 list-none ">
        <a
          href="/#about"
          class="text-base text-black hover:text-gray-700 hover:underline">
          About
        </a>
      </li>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:my-0 list-none ">
        <a
          href="/#contact"
          class="text-base text-black hover:text-gray-700 hover:underline">
          Contact
        </a>
      </li>
      <li class="text-center lg:text-left mb-6 lg:my-0 list-none ">
        <a
          on:click={toggle}
          href="/blog"
          class="text-base text-black hover:text-gray-700 hover:underline">
          Blog
        </a>
      </li>
    </ul>
  </nav>
</header>
