<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/blog/page/${params.page}.json`);
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
  import PaginationControl from "../../../components/PaginationControl.svelte";
  import LazyLoading from "../../../components/LazyLoading.svelte";
  export let data;
</script>

<svelte:head>
  {#if data.page > 1}
    <title>Page {data.page} of {data.meta.title}</title>
    <meta
      name="twitter:title"
      content="Page {data.page} of {data.meta.title}" />
    <meta property="og:title" content="Page {data.page} of {data.meta.title}" />
  {:else}
    <title>{data.meta.title}</title>
    <meta name="twitter:title" content={data.meta.title} />
    <meta property="og:title" content={data.meta.title} />
  {/if}

  <meta name="description" content={data.meta.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content="https://khrome.dev/image/**%40KhromeDotDev**%3Cbr%3Ekhrome.dev.png?theme=royal-blue&pattern=falling-triangles&screen=social&undraw=on-the-office" />
  <meta
    name="twitter:url"
    content="https://khrome.dev{data.pagination.currentPage}" />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta
    property="og:url"
    content="https://khrome.dev{data.pagination.currentPage}" />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="article:section" />
  <meta
    property="og:image"
    content="https://khrome.dev/image/**%40KhromeDotDev**%3Cbr%3Ekhrome.dev.png?theme=royal-blue&pattern=falling-triangles&screen=social&undraw=on-the-office" />

  {#if data.pagination.previousPage}
    <link rel="prev" href="https://khrome.dev{data.pagination.previousPage}" />
  {/if}

  {#if data.pagination.nextPage}
    <link rel="next" href="https://khrome.dev{data.pagination.nextPage}" />
  {/if}

  <link
    rel="canonical"
    href="https://khrome.dev{data.pagination.currentPage}" />

  {@html data.ldjson}
</svelte:head>

<div
  class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
  style="background-image: linear-gradient(to bottom, rgba(40,69,105,0)
  0%,rgba(36,60,90,1) 80%), url('/dots.svg');" />
<div
  class="container-inner mx-auto -mt-48 mb-16 relative bg-white pt-4
  sm:rounded-t-lg sm:px-8 sm:pt-8">
  {#each data.posts as { attributes, slug, timeToRead }}
    <div class="post border-gray-400 border-b mb-12">
      {#if attributes.cover_image}
        <a href="/blog/{slug}">
          <img
            alt="Cover image"
            class="lazy w-full mx-auto mb-8 rounded-lg"
            data-src={attributes.cover_image} />
        </a>
      {/if}
      <h2 class="text-3xl font-display font-bold">
        <a href="/blog/{slug}" class="text-copy-primary">{attributes.title}</a>
      </h2>
      <div class="text-gray-700 mb-4">
        <span>{attributes.date}</span>
        <span class="pl-4 pr-4 inline-block">&middot;</span>
        <span>{timeToRead} min read</span>
      </div>

      <div class="text-lg mb-4">{attributes.description}</div>

      <div class="mb-8">
        <a href="/blog/{slug}" class="font-bold uppercase">Read More</a>
      </div>
    </div>
  {/each}

  <PaginationControl page={data.page} {...data.pagination} />

</div>
<TheNewsletter />
<LazyLoading />
