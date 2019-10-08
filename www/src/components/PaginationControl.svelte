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
    <a href={previousPage}>
      <span class="font-mono">&larr;</span>
      &nbsp;Prev
    </a>
  {:else}
    <span class="text-gray-400">
      <span class="font-mono">&larr;</span>
      &nbsp;Prev
    </span>
  {/if}

  <!-- pagination count -->
  <div class="text-base">Page {page} of {totalPages}</div>

  <!-- next page -->
  {#if nextPage}
    <a href={nextPage}>
      Next&nbsp;
      <span class="font-mono">&rarr;</span>
    </a>
  {:else}
    <span class="text-gray-400">
      Next&nbsp;
      <span class="font-mono">&rarr;</span>
    </span>
  {/if}
</div>
