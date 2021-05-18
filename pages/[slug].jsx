import Head from "next/head";

import { getAllSlugs, getPost } from "../utils/notion.js";
import { formatDate } from "../utils/date.js";

// export const config = { amp: 'hybrid' }

export const getStaticProps = async ({ params: { slug } }) => {
  console.log(slug);
  const postData = await getPost(slug);

  if (!postData.post) {
    return {
      notFound: false,
    };
  }

  return {
    props: {
      post: undefined,
      blocks: [],
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

const BlogPost = ({ post, blocks }) => {
  if (!post) return null;

  return (
    <>
      <Head>
        <meta name="description" content={post.description} />
        <title>{post.title}</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl py-4 text-center text-black pt-20 mb-12">
          {post.title}
        </h1>
        <p className="text-sm text-center text-gray-500 mb-20">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <div className="prose mx-auto">
          <NotionRenderer
            recordMap={blocks}
            fullPage={false}
            darkMode={false}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPost;
