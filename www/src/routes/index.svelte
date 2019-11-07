<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`index.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import AboutMe from "../components/AboutMe.svelte";
  import ContactMe from "../components/ContactMe.svelte";
  import MyWorks from "../components/MyWorks.svelte";
  import TheNewsletter from "../components/TheNewsletter.svelte";
  import TheHero from "../components/TheHero.svelte";
  import LazyLoading from "../components/LazyLoading.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content="https://res.cloudinary.com/khromedotdev/image/upload/v1573124455/Blue-KhromeDotDev_t8rcp3.png" />
  <meta name="twitter:url" content={data.meta.url} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content={data.meta.url} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/khromedotdev/image/upload/v1573124455/Blue-KhromeDotDev_t8rcp3.png" />
  {@html data.ldjson}
</svelte:head>

<TheHero />
<MyWorks />
<AboutMe />
<ContactMe />
<TheNewsletter />
<LazyLoading />
