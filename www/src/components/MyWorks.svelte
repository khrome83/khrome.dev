<script>
  import one from "../../static/dots-one.svg";
  import two from "../../static/dots-two.svg";
  import three from "../../static/dots-three.svg";
  import four from "../../static/dots-four.svg";
</script>

<div class="bg-white text-black overflow-hidden relative">
  <div
    class="container-inner mx-auto py-16 pb-8 text-center textl-xl relative z-10">
    <div class="container-inner mx-auto text-xl pb-4 relative">
      <h2
        class="text-2xl font-bold border-b-4 border-orange-600 inline p-4"
        id="works">
        My Works
      </h2>

      <ul class="text-lg sm:text-xl text-left mt-16 pl-0">
        <li class="checkmark mb-12 relative list-none">
          <div class="absolute top-1/2 left-0">
            {@html one}
          </div>
          <div class="pl-16">Director of Technology for Inside Rx</div>
          <div class="pl-16 text-lg text-gray-600">
            I am currently responsible for the technology organization of a
            startup. I oversee several teams that span multiple consumer-facing
            digital properties.
          </div>
        </li>
        <li class="checkmark mb-12 relative list-none">
          <div class="absolute top-1/2 left-0">
            {@html two}
          </div>
          <div class="pl-16">Senior Developer for Rig Up</div>
          <div class="pl-16 text-lg text-gray-600">
            I did a short stint at a startup that is changing the oil and gas
            industry. I built an optimizations platform and worked on improving
            the user experience.
            <em>#TooManyButtonDesigns</em>
          </div>
        </li>
        <li class="checkmark mb-12 relative list-none">
          <div class="absolute top-1/2 left-0">
            {@html three}
          </div>
          <div class="pl-16">
            UI &amp; Solution Architect for General Motors
          </div>
          <div class="pl-16 text-lg text-gray-600">
            Oversaw the solution design and development powering the next
            generation of CMS platform. I managed the technical relationship
            with outside design agencies.
          </div>
        </li>
        <li class="checkmark mb-12 relative list-none">
          <div class="absolute top-1/2 left-0">
            {@html four}
          </div>
          <div class="pl-16">Senior Developer for Army Research Labs</div>
          <div class="pl-16 text-lg text-gray-600">
            The job was mostly
            <span class="text-orange-500 line-through">cowboy</span>
            contract development. I worked on a variety of internal tools and
            web properties, including analytics trackers, custom calendars,
            WebGL powered apps, and more.
          </div>
        </li>
      </ul>
      <img
        data-src="developer.svg"
        alt="hero"
        class="lazy mx-auto ml-auto mr-auto md:max-w-md" />
    </div>
  </div>
</div>
