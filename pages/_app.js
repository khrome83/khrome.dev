import 'react-notion-x/src/styles.css'
import "prismjs/themes/prism-solarizedlight.css";
import "../styles/index.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
