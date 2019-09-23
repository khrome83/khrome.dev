<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let data;
</script>

<svelte:head>
  <title>{data.attributes.title}</title>
  <meta name="description" content={data.attributes.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:title" content={data.attributes.title} />
  <meta name="twitter:description" content={data.attributes.description} />
  <meta
    name="twitter:image"
    content={data.attributes.cover_image.replace('screen=cover-image', 'screen=social')} />
  <meta name="twitter:url" content="https://khrome.dev/blog/{data.slug}" />

  <meta name="twitter:label1" content="Published" />
  <meta name="twitter:data1" content={data.attributes.date} />
  <meta name="twitter:label2" content="Reading Time" />
  <meta name="twitter:data2" content="{data.timeToRead} min read" />

  <meta property="og:title" content={data.attributes.title} />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content="https://khrome.dev/blog/{data.slug}" />
  <meta property="og:description" content={data.attributes.description} />
  <meta property="og:type" content="article" />
  <meta
    property="og:image"
    content={data.attributes.cover_image.replace('screen=cover-image', 'screen=social')} />
  {@html data.ldjson}
</svelte:head>

<div
  class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
  style="background-image: linear-gradient(to bottom, rgba(40,69,105,0)
  0%,rgba(36,60,90,1) 80%), url('./dots.svg');" />
<div
  class="container-inner mx-auto -mt-48 mb-8 relative bg-white pt-4
  sm:rounded-t-lg sm:px-8 sm:pt-8">
  {#if data.attributes.cover_image}
    <img
      alt="Cover image"
      class="w-full mx-auto mb-8 rounded-lg"
      src={data.attributes.cover_image} />
  {/if}
  <h1 class="text-4xl font-bold leading-tight">{data.attributes.title}</h1>
  <div class="text-xl text-gray-600 mb-4">
    <span>{data.attributes.date}</span>
    <span class="pl-4 pr-4 inline-block">&middot;</span>
    <span>{data.timeToRead} min read</span>
  </div>
  <div class="flex mb-8 text-sm">
    {#each data.tags as { label, slug }}
      <a
        href="/blog/tag/{slug}"
        class="inline-block bold pl-2 pr-2 pt-1 pb-1 leading-none m-1 text-sm
        bg-orange-600 hover:bg-orange-700 text-white hover:text-white">
        #{label}
      </a>
    {/each}
  </div>
  <div class="markdown-body mb-8">
    {@html data.content}
  </div>
</div>
