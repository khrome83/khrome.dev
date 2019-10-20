<script context="module">
  export async function preload({ params, query }) {
    // const res = await this.fetch(`index.json`);
    // const data = await res.json();

    // if (res.status === 200) {
    //   return { data };
    // } else {
    //   this.error(res.status, data.message);
    // }

    return { hello: "world" };
  }
</script>

<script>
  import { onMount } from "svelte";
  import Bevy from "../../components/Bevy.svelte";

  export let data;

  let loadStatus = "unknown";

  // onMount(() => {
  //   const ctx = canvasElement.getContext('2d');
  //   drawStuff(ctx);
  // });

  function fetchSVG(node) {
    fetch("https://bevy.khrome.dev/svg/")
      .then(res => res.text())
      .then(svg => node.insertAdjacentHTML("afterbegin", svg))
      .then(() => node.getElementsByTagName("svg")[0])
      .then(svgElem => console.log(svgElem.dataset.delay));
  }

  function lazy(node) {
    // simulate slow loading network
    setTimeout(() => {
      const img = new Image();
      const currentSrc = node.getAttribute("src");
      img.src = currentSrc;
      if (img.complete) {
        loadStatus = "cache";
        const newSrc = `${currentSrc}?p=${Date.now()}`;
        node.setAttribute("src", newSrc);
      } else {
        img.onload = () => {
          loadStatus = "server";
        };
      }
    }, 2000);

    return {
      destroy() {} // noop
    };
  }
</script>

<svelte:head>
  <title>Khrome.dev - Thank You for Reaching Out</title>
</svelte:head>

<div class="container-inner mx-auto py-16 text-center">
  <h1
    class="font-display text-2xl font-bold border-b-4 border-orange-700 inline
    p-4">
    Bevy Test
  </h1>
  <div class="border rounded mt-16 shadow">
    <img alt="test" src="https://bevy.khrome.dev/api/" use:lazy class="" />
  </div>
  <p class="mt-8">{loadStatus}</p>

  <div id="fetchSVG" use:fetchSVG />

  <Bevy />
</div>
