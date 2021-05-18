import Link from "next/link";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

const Pagination = ({ prev = false, next = false }) => {
  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-evenly px-4">
      <div>
        {prev ? (
          <Link href={prev}>
            <a className="text-base inline-flex items-center font-semibold text-purple-600 hover:text-purple-500">
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-purple-600"
                aria-hidden="true"
              />
              Previous
            </a>
          </Link>
        ) : null}
      </div>
      <div>
        {next ? (
          <Link href={next}>
            <a className="text-base inline-flex items-center font-semibold text-purple-600 hover:text-purple-500">
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-purple-600"
                aria-hidden="true"
              />
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
