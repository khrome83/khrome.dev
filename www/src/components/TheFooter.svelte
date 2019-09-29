<script>
  import linkedin from "../../static/linkedin.svg";
  import devto from "../../static/devto.svg";
  import github from "../../static/github.svg";
  import twitter from "../../static/twitter.svg";
</script>

<footer class="bg-white text-black">
  <div
    class="container mx-auto flex flex-col lg:flex-row items-center
    justify-between py-8">
    <div class="text-sm mb-8 lg:mb-0">
      <div>Copyright 2019 Zane C. Milakovic. All rights reserved.</div>
      <div class="mt-1 text-center lg:text-left">
        <a
          href="rss.xml"
          class="hover:text-black hover:underline font-normal mr-4">
          RSS Feed
        </a>
        <a
          href="sitemap.xml"
          class="hover:text-black hover:underline font-normal">
          Sitemap
        </a>
      </div>
    </div>

    <ul class="flex items-center mb-0 pl-0">
      <li class="mr-8 my-0 list-none">
        <a
          href="https://twitter.com/khromedotdev"
          target="_blank"
          rel="me"
          class="hover:text-black">
          {@html twitter}
        </a>
      </li>

      <li class="mr-8 my-0 list-none">
        <a
          href="https://github.com/khrome83"
          target="_blank"
          rel="me"
          class="hover:text-black">
          {@html github}
        </a>
      </li>

      <li class="mr-8 my-0 list-none">
        <a href="https://dev.to/khrome83" rel="me" class="hover:text-black">
          {@html devto}
        </a>
      </li>

      <li class="my-0 list-none">
        <a
          href="https://www.linkedin.com/in/zanecmilakovic"
          rel="me"
          class="hover:text-black">
          {@html linkedin}
        </a>
      </li>
    </ul>
  </div>
</footer>
