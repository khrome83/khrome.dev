<script>
  import { onMount } from "svelte";

  let bevyToast;

  onMount(() => {
    // Get Analytics Data
    const {
      navigator: { langage, useragent },
      location: { hostname, href, pathname, hash, search }
    } = window;

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
