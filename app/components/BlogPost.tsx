import { Link } from "@remix-run/react";
import thumb from "~/assets/blog/flame-for-javascript-rethinking-serverless-thumb.png";

export default function BlogPost({
  title,
  excerpt,
  slug
}){
  return (
    <Link prefetch="intent" to={slug} className="w-full my-2 no-underline flex flex-col gap-4">
      <div className="w-full bg-gray-200 rounded-lg h-[200px]"></div>
      <h2 className="w-full text-3xl font-medium text-teal-600 dark:text-gray-100">
        {title}
      </h2>
    {excerpt && <p className="text-gray-500 text-lg dark:text-gray-300">{excerpt}...</p>}
    </Link>
  );
}
