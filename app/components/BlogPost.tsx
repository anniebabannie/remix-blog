import { Link, json, useLoaderData, useRouteLoaderData } from "@remix-run/react";

export default function BlogPost({
  title,
  excerpt,
  slug,
  thumbnail
}){
  const { env } = useRouteLoaderData('root') as { env: { BUCKET_NAME: string, AWS_ENDPOINT_URL_S3: string } };
  return (
    <Link prefetch="intent" to={slug} className="w-full my-2 no-underline flex flex-col gap-4 bg-white border border-solid border-gray-100 p-5 shadow hover:shadow-md transition-shadow rounded-lg">
      {thumbnail && 
        <img className="rounded-lg" src={`${env.AWS_ENDPOINT_URL_S3}/${env.BUCKET_NAME}/${thumbnail}`} alt="" />
      }
      {!thumbnail &&
        <div className="w-full bg-gray-200 rounded-lg h-[219px]"></div>
      }
      <h2 className="w-full text-3xl font-medium text-teal-600 dark:text-gray-100">
        {title}
      </h2>
    {excerpt && <p className="text-gray-500 text-lg dark:text-gray-300">{excerpt}...</p>}
    </Link>
  );
}
