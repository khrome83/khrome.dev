<script>
  import TheHeader from "../components/TheHeader.svelte";
  import TheFooter from "../components/TheFooter.svelte";
</script>

<main
  class="content-wrapper bg-background-primary font-sans text-copy-primary
  leading-normal flex flex-col min-h-screen">
  <TheHeader />
  <div class="flex-grow">
    <slot />
  </div>
  <TheFooter />
</main>
