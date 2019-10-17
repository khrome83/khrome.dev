<script>
  import { onMount } from "svelte";

  let bevyToast;

  onMount(() => {
    // Default Settings
    let hashMode = false;
    let track = true;

    // Get Basic Analytics Data From Browser
    let {
      navigator: { langage, userAgent, doNotTrack },
      location: { hostname, href, pathname, hash, search },
      document: { referrer },
    } = window;

    // Get User Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // TODO: Block Bots from userAgent

    // TODO: Block Localhost

    // Strip Out Ref and Campaign from Query
    const urlParams = new URLSearchParams(search);
    const ref = (urlParams.has('utm_source') ? urlParams.get('utm_source') : (urlParams.has('source') ? urlParams.get('source') : (urlParams.has('ref') ? urlParams.get('ref') : referrer)));
    const campaign = (urlParams.has('utm_campaign') ? urlParams.get('utm_campaign') : (urlParams.has('campaign') ? urlParams.get('campaign') : ''));
    const medium = (urlParams.has('utm_medium') ? urlParams.get('utm_medium') : 'website');

    // TODO: Check is Hash Mode


    // TODO: Reform Correct Route, minus extra hash and query params

    // TODO: Create URL for Request

    // TODO: Record Page View

    // TODO: Figure out how to use cache or other means to identify a new session





    //----

    // window.navigator.language
    // 'en-US'

    // window.navigator.languages
    // ['en-US', 'en']

    // window.location.host
    // 'khrome.dev'

    // window.location.hostname
    // 'khrome.dev'

    // window.location.href
    // 'https://khrome.dev/'
    // 'https://khrome.dev/blog/custom-decorators-with-storybook-and-vue'

    // window.location.origin
    // 'https://khrome.dev'

    // window.location.pathname
    // '/'
    // '/blog/custom-decorators-with-storybook-and-vue'

    // window.navigator.userAgent
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'

    // document.referrer
    // 'https://www.google.com'

    // Intl.DateTimeFormat().resolvedOptions().timeZone
    // 'American/Chicago'

    // window.navigator.doNotTrack
    // '1'

    // window.location.hash
    // '#/cart'

    // Strip out query params
    // - Keep utm_source|source|ref
    // - Keep utm_campaign|campaign

    // Strip out hash
    // - Keep Hash if Hash Mode
    // - Test with \(#!|#\/)\ig

    // var urlParams = new URLSearchParams(location.search);

    // urlParams.has('type');  // true
    // urlParams.get('id');    // 1234
    // urlParams.getAll('id'); // ["1234"]
    // urlParams.toString();   // type=product&id=1234
  });
</script>

<div class="border rounded mt-16 shadow" bind:this={bevyToast} />
