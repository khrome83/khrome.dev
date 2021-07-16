import "../styles/index.css";
import Head from "next/head";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="author" content="Zane C. Milakovic" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
