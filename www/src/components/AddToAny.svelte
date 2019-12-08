<script>
  export let url;
  export let title;

  const buttons = [
    {
      href: "https://www.addtoany.com/add_to/facebook",
      src: "https://static.addtoany.com/buttons/facebook.svg",
      alt: "Share this artcile on Facebook",
      color: "bg-facebook"
    },
    {
      href: "https://www.addtoany.com/add_to/twitter",
      src: "https://static.addtoany.com/buttons/twitter.svg",
      alt: "Share this artcile on Twitter",
      color: "bg-twitter"
    },
    {
      href: "https://www.addtoany.com/add_to/reddit",
      src: "https://static.addtoany.com/buttons/reddit.svg",
      alt: "Share this artcile on Reddit",
      color: "bg-reddit"
    },
    {
      href: "https://www.addtoany.com/add_to/hacker_news",
      src: "https://static.addtoany.com/buttons/y18.svg",
      alt: "Share this artcile on Hacker News",
      color: "bg-hacker-news"
    }
  ];
</script>

<aside
  class="mb-8 lg:px-0 lg:fixed lg:left-0 lg:top-0 lg:mt-64 lg:ml-8 bg-white
  lg:pt-2 lg:px-2 rounded">
  <h2 class="font-display lg:hidden">Share this article</h2>
  {#each buttons as { href, src, alt, color }}
    <a
      class="mr-2 block w-8 inline-block lg:block lg:w-8 lg:mr-0 lg:mb-2"
      href="{href}?linkurl={encodeURI(url)}&linkname={encodeURI(title)}"
      target="_blank">
      <img
        {src}
        {alt}
        width="32"
        height="32"
        class="{color} rounded hover:bg-black" />
    </a>
  {/each}
</aside>
