<script>
  import { onMount } from "svelte";
  import lozad from "lozad";

  onMount(() => {
    const observer = lozad(".lazy");
    observer.observe();
  });
</script>
