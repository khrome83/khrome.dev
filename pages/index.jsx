import Head from "next/head";
import Link from "next/link";
import BlogList from "../components/BlogList.jsx";
import Pagination from "../components/Pagination.jsx";
import { getAllPosts } from "../utils/notion.js";

export const getStaticProps = async () => {
  const response = await getAllPosts();

  return {
    props: {
      posts: response.posts,
      next: response.next ? "/page/2" : false,
    },
    revalidate: 10,
  };
};

const IndexPage = ({ posts, next }) => (
  <>
    <Head>
      <meta
        name="description"
        content="Thoughts about Web Development by Zane Milakovic"
      />
      <title>Khrome.dev - Thoughts on web development.</title>
    </Head>
    <h1 className="text-5xl text-center text-black py-20">My Thoughts</h1>
    <BlogList posts={posts} />

    <Pagination next={next} />
  </>
);

export default IndexPage;
