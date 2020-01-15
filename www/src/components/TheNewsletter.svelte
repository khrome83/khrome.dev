<div class="bg-regal-blue text-white overflow-hidden">
  <div
    class="container-inner mx-auto py-16 pb-8 text-center textl-xl relative z-10">
    <h2
      class="font-display text-2xl font-bold border-b-4 border-orange-600 inline
      p-4">
      Get My Newsletter
    </h2>

    <div class="w-4/5 mx-auto mb-8">
      <p class="mt-16 mb-8 text-lg sm:text-xl text-left lg:text-center">
        Sometimes I send stuff out. You
        <strong class="text-orange-500">might</strong>
        want to read it...
      </p>

      <form
        on:submit={() => window.sa('newsletter_signup')}
        target="_blank"
        action="https://formsubmit.co/c8ed50837a01e600e685d4a7d2e7f80e"
        method="POST">
        <div class="flex flex-col sm:flex-row">
          <input type="text" name="_honey" style="display:none" />
          <input type="hidden" name="_replyto" />
          <input
            type="hidden"
            name="_subject"
            value="[Khrome.dev] Newsletter Signup" />
          <input
            type="hidden"
            name="_next"
            value="https://khrome.dev/signed-up" />
          <input
            aria-label="Email Address"
            type="email"
            name="email"
            placeholder="Your email address"
            class="text-black flex-1 bg-background-form rounded
            sm:rounded-r-none px-4 py-4 leading-normal border border-gray-600
            sm:border-r-0 shadow outline-none focus:border-orange-600 z-10"
            required />
          <button
            data-element="submit"
            type="submit"
            class="flex-2 w-40 uppercase bg-orange-700 text-white rounded
            sm:rounded-l-none text-lg py-3 px-8 tracking-wide shadow
            focus:outline-none hover:bg-orange-900 focus:bg-orange-900 z-10
            w-full sm:w-auto mt-4 sm:mt-0">
            <span>Subscribe</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <div
    class="container-inner mx-auto -mt-82 overflow-x-hidden max-h-25
    overflow-y-hidden z-0">
    <img
      class="lazy"
      role="presentation"
      tabindex="-1"
      alt="grouping of dots spread out from the center"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      data-src="https://res.cloudinary.com/khromedotdev/image/upload/v1570494446/background_xfv1yg.svg" />
  </div>
</div>
