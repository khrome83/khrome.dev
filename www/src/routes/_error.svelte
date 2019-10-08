<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>Khrome.dev - {status}</title>
</svelte:head>

<div class="container-inner mx-auto py-16 text-center">
  <h1
    class="text-2xl font-display font-bold border-b-4 border-orange-600 inline
    p-4">
    {status}
  </h1>
  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
