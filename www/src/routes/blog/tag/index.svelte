<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/blog/tag.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import TheNewsletter from "../../../components/TheNewsletter.svelte";
  import LazyLoading from "../../../components/LazyLoading.svelte";
  export let data;
</script>

<svelte:head>

  <title>{data.meta.title}</title>
  <meta name="twitter:title" content={data.meta.title} />
  <meta property="og:title" content={data.meta.title} />
  <meta name="description" content={data.meta.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content="https://khrome.dev/image/**%40KhromeDotDev**%3Cbr%3Ekhrome.dev.png?theme=royal-blue&pattern=falling-triangles&screen=social&undraw=on-the-office" />
  <meta name="twitter:url" content="https://khrome.dev{data.meta.url}" />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content="https://khrome.dev{data.meta.url}" />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="article:section" />
  <meta
    property="og:image"
    content="https://khrome.dev/image/**%40KhromeDotDev**%3Cbr%3Ekhrome.dev.png?theme=royal-blue&pattern=falling-triangles&screen=social&undraw=on-the-office" />

  {@html data.ldjson}
</svelte:head>
<div
  class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
  style="background-image: linear-gradient(to bottom, rgba(40,69,105,0)
  0%,rgba(36,60,90,1) 80%),
  url('https://res.cloudinary.com/khromedotdev/image/upload/v1570495004/dots_rkcfoz.svg');" />
<div
  class="container-inner mx-auto -mt-48 mb-16 relative bg-white pt-4
  sm:rounded-t-lg sm:px-8 sm:pt-8 text-center">

  <div class="mb-16">
    <h1
      class="font-display text-2xl font-bold border-b-4 border-orange-600 inline
      p-4">
      What are you interested in?
    </h1>
  </div>

  {#each data.tags as { label, slug }}
    <a
      href="/blog/tag/{slug}"
      class="font-mono text-4xl inline-block font-bold inline-block bold pl-2
      pr-2 pt-1 pb-1 leading-none m-2 bg-orange-700 hover:bg-orange-900
      focus:bg-orange-900 text-white hover:text-white">
      #{label}
    </a>
  {/each}

  <img
    class="lazy mx-auto my-16 w-full max-w-lg"
    alt="Problem Solving"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    data-src="https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570494449/problem_solving_lvvkpq.svg" />
</div>
<TheNewsletter />
<LazyLoading />
