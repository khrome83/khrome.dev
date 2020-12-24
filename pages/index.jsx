import Head from "next/head";
import BlogList from "../components/BlogList.jsx";
import { getAllPosts } from "../utils/notion.js";

export const getStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    }
  };
};

const IndexPage = ({ posts }) => (
  <>
    <Head>
      <meta name='description' content="Thoughts about Web Development by Zane Milakovic" />
      <title>Khrome.dev - Thoughts on web development.</title>
    </Head>
    <h1 className="text-5xl py-4 text-center text-black py-20">My Thoughts</h1>
    <BlogList posts={posts} />
  </>
);

export default IndexPage;
