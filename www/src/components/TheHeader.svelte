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
        class="flex items-center px-3 py-2 border rounded border-gray-500
        hover:text-gray-700 hover:underline hover:border-gray-600">
        {@html menu}
      </button>
    </div>
    <ul
      class="uppercase tracking-wide font-bold w-full block flex-grow
      overflow-y-hidden lg:flex lg:flex-initial lg:w-auto items-center
      lg:overflow-auto lg:max-h-screen transition-all transition-ease"
      class:max-h-screen={isOpen}
      class:max-h-none={!isOpen}>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
        <a
          href="/#works"
          class="text-black hover:text-gray-700 hover:underline">
          Works
        </a>
      </li>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
        <a
          href="/#about"
          class="text-black hover:text-gray-700 hover:underline">
          About
        </a>
      </li>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
        <a
          href="/#contact"
          class="text-black hover:text-gray-700 hover:underline">
          Contact
        </a>
      </li>
      <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
        <a href="/" class="text-black hover:text-gray-700 hover:underline">
          Blog
        </a>
      </li>
      <li class="text-center mb-6 lg:mb-0">Search Input Goes Here</li>
    </ul>
  </nav>
</header>
