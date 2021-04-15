import Head from "next/head";

const IndexPage = ({ posts }) => (
  <>
    <Head>
      <meta
        name="description"
        content="Thoughts about Web Development by Zane Milakovic"
      />
      <title>Khrome.dev - Thoughts on web development.</title>
    </Head>
    <h1 className="text-5xl text-center text-black py-20">Upgrading...</h1>
    <span>Stay tuned...</span>
  </>
);

export default IndexPage;
