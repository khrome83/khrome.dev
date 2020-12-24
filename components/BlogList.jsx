import BlogTile from "./BlogTile.jsx";

const BlogList = ({ posts }) => (
  <>
    <div className="bg-white pb-20 px-4 sm:px-6  lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts.map((post) => (
            <BlogTile key={`${post.slug}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default BlogList;
