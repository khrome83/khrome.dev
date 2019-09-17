<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`blog.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import TheNewsletter from "../../components/TheNewsletter.svelte";
  export let data;
</script>

<!---
  TODO:
    - Title
    - Description
    - Twitter Card
    - OG Setup
    - JSON+LD
      - https://jsonld-examples.com/schema.org/code/blog-markup.php
-->
<svelte:head>
  <title>Blog</title>
</svelte:head>

<div
  class="bg-regal-blue text-white overflow-hidden bg-repeat min-h-20"
  style="background-image: linear-gradient(to bottom, rgba(40,69,105,0)
  0%,rgba(36,60,90,1) 80%), url('./dots.svg');" />
<div
  class="container-inner mx-auto -mt-48 mb-16 relative bg-white pt-4
  sm:rounded-t-lg sm:px-8 sm:pt-8">
  {#each data.posts as { attributes, slug, timeToRead }}
    <div class="post border-gray-400 border-b mb-12">
      {#if attributes.cover_image}
        <a href="/blog/{slug}">
          <img
            alt="Cover image"
            class="w-full mx-auto mb-8 rounded-lg"
            src={attributes.cover_image} />
        </a>
      {/if}
      <h2 class="text-3xl font-bold">
        <a href="/blog/{slug}" class="text-copy-primary">{attributes.title}</a>
      </h2>
      <div class="text-copy-secondary mb-4">
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

  <!-- PAGINATION GOES HERE -->

</div>
<TheNewsletter />
