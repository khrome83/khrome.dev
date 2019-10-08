<script>
  export let page;
  export let currentPage;
  export let totalPages;
  export let previousPage;
  export let nextPage;
</script>

<div class="flex justify-between text-xl items-center">
  <!-- previous page -->
  {#if previousPage}
    <a href={previousPage}>&larr; Prev</a>
  {:else}
    <span class="text-gray-400">&larr; Prev</span>
  {/if}

  <!-- pagination count -->
  <div class="text-base">Page {page} of {totalPages}</div>

  <!-- next page -->
  {#if nextPage}
    <a href={nextPage}>Next &rarr;</a>
  {:else}
    <span class="text-gray-400">Next &rarr;</span>
  {/if}
</div>
