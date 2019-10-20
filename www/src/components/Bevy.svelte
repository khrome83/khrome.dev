<script>
  import { onMount } from "svelte";

  let bevyToast;
  let data = {};

  // Creates URL for Request for given action
  function createUri(base, action, host, uid, path, hash, query) {
    return `https://${`${base}/api/${action}/${host}/${uid}/${pathname}/${hash}${query}`.replace(
      /\/{2,}/gm,
      "/"
    )}`;
  }

  onMount(() => {
    console.log("window", window.navigator.langauge);

    // Default Settings
    const hashCheck = new RegExp("(#!/{0,1}|#/)(.*)");
    let hashPath = "";
    let track = true;
    let lastSentUrl = false;
    let timezone = undefined;
    let uid = 0;

    // Get Basic Analytics Data From Browser
    // let {
    //   navigator: { language, userAgent, doNotTrack },
    //   location: { hostname, pathname, hash, search },
    //   document: { referrer }
    // } = window;

    if (window && window.navigator && window.navigator.language) {
      data["language"] = window.navigator.language;
    }

    if (window && window.navigator && window.navigator.userAgent) {
      data["userAgent"] = window.navigator.userAgent;
    }

    if (window && window.navigator && window.navigator.doNotTrack) {
      data["doNotTrack"] = window.navigator.doNotTrack;
    }

    if (window && window.location && window.location.hostname) {
      data["hostname"] = window.location.hostname;
    }

    if (window && window.location && window.location.pathname) {
      data["pathname"] = window.location.pathname;
    }

    if (window && window.location && window.location.hash) {
      data["hash"] = window.location.hash;
    }

    if (window && window.location && window.location.search) {
      data["search"] = window.location.search;
    }

    if (window && window.document && window.document.referrer) {
      data["referrer"] = window.document.referrer;
    }

    // Block Bots by simple userAgent
    if (
      /(bot|spider|crawl|download|fetch|grab|image|screenshot)/i.test(
        data.userAgent
      )
    ) {
      track = false;
    }

    // Block Localhost and DoNotTrack
    if (data.hostname === "localhost" || data.doNotTrack === "1") {
      track = false;
    }

    // Check is Hash Mode
    const hashMode = hashCheck.exec(data.hash);
    if (hashMode !== null && hashMode[2]) {
      hashPath = hashMode[2];
    }

    // Strip Out Ref and Campaign from Query
    // Build New Query
    const queryParts = [];
    const urlParams = new URLSearchParams(data.search);

    if (data.language) queryParts.push(`lang=${data.language}`);

    // Referrer
    const ref = urlParams.has("utm_source")
      ? urlParams.get("utm_source")
      : urlParams.has("source")
      ? urlParams.get("source")
      : urlParams.has("ref")
      ? urlParams.get("ref")
      : data.referrer;

    if (ref) queryParts.push(`ref=${ref}`);

    // Campaign
    const campaign = urlParams.has("utm_campaign")
      ? urlParams.get("utm_campaign")
      : urlParams.has("campaign")
      ? urlParams.get("campaign")
      : "";

    if (campaign) queryParts.push(`campaign=${campaign}`);

    // Medium
    const medium = urlParams.has("utm_medium")
      ? urlParams.get("utm_medium")
      : "website";

    if (medium) queryParts.push(`medium=${medium}`);

    const queryString = queryParts.length ? `?${queryParts.join("&")}` : "";

    // Get User Timezone
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      // not reporting errors
    }

    // TODO: Add Support for Push State

    data["uri"] = createUri(
      "bevy.khrome.dev",
      "page",
      data.hostname,
      uid,
      data.pathname,
      data.hash,
      queryString
    );

    // TODO: Record Page View

    // TODO: Figure out how to use cache or other means to identify a new session
  });
</script>

<div class="border rounded mt-16 shadow" bind:this={bevyToast}>
  <ul>
    <li>language: {data.language}</li>
    <li>userAgent: {data.userAgent}</li>
    <li>doNotTrack: {data.doNotTrack}</li>
    <li>hostname: {data.hostname}</li>
    <li>pathname: {data.pathname}</li>
    <li>hash: {data.hash}</li>
    <li>serach: {data.serach}</li>
    <li>referrer: {data.referrer}</li>
    <li>uri: {data.uri}</li>
  </ul>
</div>
