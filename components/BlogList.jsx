import BlogTile from "./BlogTile.jsx";

const posts = [
  {
    date: "Mar 16, 2020",
    title: "Boost your conversion rate",
    slug: "boost-your-conversion-rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
  },
  {
    date: "Mar 10, 2020",
    title: "How to use search engine optimization to drive sales",
    slug: "how-to-use-search-engine-optimization-to-drive-sales",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
  },
  {
    date: "Feb 12, 2020",
    title: "Improve your customer experience",
    slug: "improve-your-customer-experience",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
  },
  {
    date: "Jan 29, 2020",
    title: "Writing effective landing page copy",
    slug: "writing-effective-landing-page-copy",
    description:
      "Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.",
  },
];

const BlogList = () => (
  <>
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {posts.map((ctx) => (
            <>
              <BlogTile content={ctx} />
            </>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default BlogList;
