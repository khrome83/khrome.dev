<template>
  <header>
    <nav class="container mx-auto flex flex-wrap justify-between items-center py-8">
      <div>
        <g-link to="/">
          <g-image src="../../static/logo.svg" class="w-16 lg:w-20" alt="logo" />
        </g-link>
      </div>
      <div class="block lg:hidden">
        <button
          @click="toggle"
          class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-700 hover:underline hover:border-gray-600"
        >
          <svg
            class="current-color h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray" />
          </svg>
        </button>
      </div>
      <ul
        class="uppercase tracking-wide font-bold w-full block flex-grow lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
        :class="isOpen ? 'block': 'hidden'"
      >
        <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
          <a
            v-if="$route.path === '/'"
            href="/#works"
            v-scroll-to="'#works'"
            class="text-black hover:text-gray-700 hover:underline"
          >Works</a>
          <g-link v-else to="/#works" class="text-black hover:text-gray-700 hover:underline">Works</g-link>
        </li>
        <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
          <a
            v-if="$route.path === '/'"
            href="/#about"
            v-scroll-to="'#about'"
            class="text-black hover:text-gray-700 hover:underline"
          >About</a>
          <g-link v-else to="/#about" class="text-black hover:text-gray-700 hover:underline">About</g-link>
        </li>
        <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
          <a
            v-if="$route.path === '/'"
            href="/#contact"
            v-scroll-to="'#contact'"
            class="text-black hover:text-gray-700 hover:underline"
          >Contact</a>
          <g-link
            v-else
            to="/#contact"
            class="text-black hover:text-gray-700 hover:underline"
          >Contact</g-link>
        </li>
        <li class="text-center lg:text-left lg:mr-8 mb-6 lg:mb-0">
          <g-link to="/blog" class="text-black hover:text-gray-700 hover:underline">Blog</g-link>
        </li>
        <li class="text-center mb-6 lg:mb-0">
          <search-input />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import SearchInput from "../components/SearchInput";

export default {
  components: {
    SearchInput
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
