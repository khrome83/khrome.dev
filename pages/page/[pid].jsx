import Head from "next/head";
import Link from "next/link";
import BlogList from "../../components/BlogList.jsx";
import Pagination from "../../components/Pagination.jsx";
import { getAllPosts, getPaginationCount } from "../../utils/notion.js";

export const getStaticProps = async ({ params }) => {
  const response = await getAllPosts(parseInt(params.pid, 10));

  return {
    props: {
      posts: response.posts,
      next: response.next ? `/page/${parseInt(params.pid, 10) + 1}` : false,
      prev: params.pid === "2" ? "/" : `/page/${params.pid - 1}`,
      pid: params.pid,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const count = await getPaginationCount();
  const paths = [];

  for (let i = 1; i <= count; i++) {
    if (i === 1) continue;
    paths.push({ params: { pid: `${i}` } });
  }

  return {
    paths,
    fallback: false,
  };
}

const PageContent = ({ posts, pid, prev, next }) => (
  <>
    <Head>
      <meta
        name="description"
        content="Thoughts about Web Development by Zane Milakovic"
      />
      <title>Khrome.dev - Page {pid}</title>
    </Head>
    <h1 className="text-5xl text-center text-black py-20">
      My Thoughts - Page {pid}
    </h1>
    <BlogList posts={posts} />
    <Pagination next={next} prev={prev} />
  </>
);

export default PageContent;
