import 'react-notion-x/src/styles.css'
import "prismjs/themes/prism-solarizedlight.css";
import "../styles/index.css";
import Head from "next/head";
import { useAmp } from 'next/amp'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MyApp({ Component, pageProps }) {
  const isAmp = useAmp();

  return (
    <>
      <Head>
        <meta name="author" content="Zane C. Milakovic" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="dns-prefetch" href="https://sa.khrome.dev" crossOrigin="true" />
        {isAmp ? null : <script dangerouslySetInnerHTML={{
          __html: `
          window.sa =
          window.sa ||
          function() {
            a = [].slice.call(arguments);
            sa.q ? sa.q.push(a) : (sa.q = [a]);
          };
        `}}></script>}
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      {isAmp ? null : <script async defer src="https://sa.khrome.dev/latest.js"></script> }
      {isAmp ? null : <noscript><img src="https://sa.khrome.dev/image.gif" alt=""/></noscript> }
    </>
  );
}

export default MyApp;
