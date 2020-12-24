
import Head from "next/head";
import { NotionRenderer } from "react-notion-x";

import { getAllPosts, getPost } from "../utils/notion.js";

export const getStaticProps = async ({ params: { slug } }) => {
  const postData = await getPost(slug);

  if (!postData.post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...postData,
    },
    revalidate: 10,
  }
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((row) => `/${encodeURIComponent(row.slug)}`),
    fallback: true,
  };
};

const BlogPost = ({ post, blocks }) => {
  if (!post) return null;

  return (
    <>
      <Head>
        <meta name='description' content={post.description} />
        <title>{post.title}</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl py-4 text-center text-black py-20 mb-12">{post.title}</h1>
        <div className="prose mx-auto">
          <NotionRenderer recordMap={blocks} fullPage={false} darkMode={false} />
        </div>
      </div >
    </>
  );
}

export default BlogPost;