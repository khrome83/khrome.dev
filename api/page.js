module.exports = (req, res) => {
  const { token, path, domain } = req.query;

  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ domain, token, path: `/${path}` });
};

/*

  var nav = window.navigator
  var loc = window.location
  var host = loc.hostname
  var doc = window.document
  var con = window.console
  var uri = '//' + hostname
  var targetOrigin = 'https://' + hostname

  try {
    var userAgent = nav.userAgent
    var dis = window.dispatchEvent


    if (host === 'localhost') return warn(notSending + 'from localhost')

    if (/(bot|spider|crawl)/i.test(userAgent)) return warn(notSending + 'because user agent is a robot')


    var ref = getParams('utm_source|source|ref')
    var campaign = getParams('utm_campaign|campaign')


          // Obfuscate personal data in URL by dropping the search and hash
      var url = loc.protocol + '//' + host + loc.pathname

      // Add hash to url when script is put in to hash mode
      if (mode === 'hash' && loc.hash) url += loc.hash.split('?')[0]

            // Don't send the last URL again (this could happen when pushState is used to change the URL hash or search)
      if (lastSendUrl === url) return
      lastSendUrl = url

      // Don't track when Do Not Track is set to true
      if (!skipDNT && 'doNotTrack' in nav && nav.doNotTrack === '1') return warn(notSending + 'when doNotTrack is enabled')

        try {
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      } catch (error) {
        // nothing
      }

  */

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
