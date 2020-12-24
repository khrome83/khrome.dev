import Link from "next/link";

const formatDate = (date) => {
  const [d, M, D, Y] = new Date(`${date}T05:00:00`).toString().split(' ');
  return `${M} ${D}, ${Y}`;
}

const BlogTile = ({ post: { date, title, description, slug } }) => (
  <div>
    <p className="text-sm text-gray-500">
      <time dateTime={date}>{formatDate(date)}</time>
    </p>
    <Link href={`/${encodeURIComponent(slug)}`}>
      <a className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{title}</p>
        <p className="mt-3 text-base text-gray-500">{description}</p>
      </a>
    </Link>
    <div className="mt-3">
      <Link href={`/${encodeURIComponent(slug)}`}>
        <a className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
          Read full story
        </a>
      </Link>
    </div>
  </div>
);

export default BlogTile;
