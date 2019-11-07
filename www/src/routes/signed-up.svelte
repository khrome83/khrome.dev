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
  export let data;
</script>

<svelte:head>
  <title>Khrome.dev - You Have Signed Up</title>
  <meta name="description" content={data.meta.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content="https://res.cloudinary.com/khromedotdev/image/upload/v1573124455/Dark-KhromeDotDev_usovw0.png" />
  <meta name="twitter:url" content={data.meta.url} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content={data.meta.url} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/khromedotdev/image/upload/v1573124455/Dark-KhromeDotDev_usovw0.png" />
  {@html data.ldjson}
</svelte:head>

<div class="container-inner mx-auto py-16 text-center">
  <h1
    class="font-display text-2xl font-bold border-b-4 border-orange-700 inline
    p-4">
    You Have Signed Up!
  </h1>
  <img
    alt="A magnet sucking up @ signs"
    src="https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570495004/email_ov1wrq.svg"
    class="mt-32" />
</div>
