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
  <title>Khrome.dev - Thank You for Reaching Out</title>
  <meta name="description" content={data.meta.description} />
  <meta name="twitter:domain" content="khrome.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@khromeDotDev" />
  <meta name="twitter:creator" content="@khromeDotDev" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
  <meta
    name="twitter:image"
    content="https://khrome.dev/image/**Khrome.dev**%3Cbr%3E%40KhromeDotDev.png?theme=dark-mode&pattern=topography&screen=social&undraw=on-the-office" />
  <meta name="twitter:url" content={data.meta.url} />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:site_name" content="KhromeDotDev" />
  <meta property="og:url" content={data.meta.url} />
  <meta property="og:description" content={data.meta.description} />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://khrome.dev/image/**Khrome.dev**%3Cbr%3E%40KhromeDotDev.png?theme=dark-mode&pattern=topography&screen=social&undraw=on-the-office" />
  {@html data.ldjson}
</svelte:head>

<div class="container-inner mx-auto py-16 text-center">
  <h2 class="text-2xl font-bold border-b-4 border-orange-600 inline p-4">
    Thank You for Reaching Out!
  </h2>
  <img
    alt="Giant letter envelop showing mail was sent"
    src="https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570495015/mail_sent_pvm1vs.svg"
    class="mt-32 mx-auto sm:max-w-lg" />
</div>
