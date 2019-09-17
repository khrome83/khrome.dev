<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
</script>

<svelte:head>
  <title>{post.attributes.title}</title>
  <meta name="description" content={post.attributes.description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:title" content={post.attributes.title} />
  <meta name="twitter:description" content={post.attributes.description} />
  <meta
    name="twitter:image"
    content={post.attributes.cover_image.replace('screen=cover-image', 'screen=social')} />
  <meta property="og:title" content={post.attributes.title} />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content="https://khrome.dev" />
  <meta property="og:description" content={post.attributes.description} />
  <meta property="og:type" content="article" />
  <meta
    property="og:image"
    content={post.attributes.cover_image.replace('screen=cover-image', 'screen=social')} />
  {@html post.ldjson}
</svelte:head>

<div
  class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
  style="background-image: linear-gradient(to bottom, rgba(40,69,105,0)
  0%,rgba(36,60,90,1) 80%), url('./dots.svg');" />
<div
  class="container-inner mx-auto -mt-48 mb-8 relative bg-white pt-4
  sm:rounded-t-lg sm:px-8 sm:pt-8">
  {#if post.attributes.cover_image}
    <img
      alt="Cover image"
      class="w-full mx-auto mb-8 rounded-lg"
      src={post.attributes.cover_image} />
  {/if}
  <h1 class="text-4xl font-bold leading-tight">{post.attributes.title}</h1>
  <div class="text-xl text-gray-600 mb-4">
    <span>{post.attributes.date}</span>
    <span class="pl-4 pr-4 inline-block">&middot;</span>
    <span>{post.timeToRead} min read</span>
  </div>
  <div class="flex mb-8 text-sm">
    {#each post.tags as { label, slug }}
      <a
        href="/tag/{slug}"
        class="inline-block bold pl-2 pr-2 pt-1 pb-1 leading-none m-1 text-sm
        bg-orange-600 hover:bg-orange-700 text-white hover:text-white">
        #{label}
      </a>
    {/each}
  </div>
  <div class="markdown-body mb-8">
    {@html post.content}
  </div>
</div>
