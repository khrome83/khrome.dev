<script>
  import texas from "../../static/texas.svg";
  const tags = [
    "developer",
    "leader",
    "javascript",
    "node",
    "serverless",
    "frontend",
    "startup",
    "nextjs",
    "react",
    "vue",
    "nuxt",
    "gridsome",
    "express",
    "tailwindcss",
    "es6",
    "typescript",
    "sapper",
    "svelte"
  ];
</script>

<div class="bg-regal-blue text-white overflow-hidden">
  <div
    class="container-inner mx-auto py-16 pb-8 text-center textl-xl relative z-10">
    <h2
      class="font-display text-2xl font-bold border-b-4 border-orange-600 inline
      p-4"
      id="about">
      About Me
    </h2>
    <div
      class="flex flex-col mt-16 sm:flex-row justify-between items-center mb-16">
      <div>
        <img
          data-src="https://res.cloudinary.com/khromedotdev/image/upload/c_scale,w_auto:100,dpr_auto,f_auto,q_auto/v1570495364/avatar_logdm7.jpg"
          alt="avatar"
          class="lazy w-32 h-32 rounded-full mb-8 lg:mb-0" />
      </div>
      <div class="flex-1 text-lg sm:text-xl md:ml-12 text-center md:text-left">
        <p>
          I have spent most of the last 18 years making things, typically with
          web technologies. I specialize in creating solid experiences that
          delight. I also enjoy building world-class teams.
        </p>
        <div class="mt-4">
          {#each tags as tag}
            <span
              class="inline-block bold pl-2 pr-2 pt-1 pb-1 leading-none m-1
              text-sm bg-orange-600 text-white font-mono">
              #{tag}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div
    class="container-inner mx-auto -mt-82 ml-auto -mr-64 overflow-x-hidden
    max-h-25 overflow-y-hidden z-0">
    {@html texas}
  </div>
</div>
