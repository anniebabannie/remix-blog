import { Link, useRouteLoaderData } from "@remix-run/react";

export default function BlogPost({
  date,
  title,
  excerpt,
  slug,
  thumbnail
}){
  const { env } = useRouteLoaderData('root') as { env: { BUCKET_NAME: string, AWS_ENDPOINT_URL_S3: string } };
  return (
    <Link prefetch="intent" to={slug} className="w-full my-2 no-underline flex flex-col bg-white border border-solid border-gray-100 shadow hover:shadow-md transition-shadow rounded-lg">
      <div className="p-2">
        {thumbnail && 
          <img className="rounded-lg" src={`${env.AWS_ENDPOINT_URL_S3}/${env.BUCKET_NAME}${slug}/${thumbnail}`} alt="" />
        }
        {!thumbnail &&
          <div className="w-full bg-gray-200 rounded-lg h-[219px]"></div>
        }
      </div>
      <div className="px-6 py-6 -mt-2 flex flex-col gap-5">
        <h2 className="w-full text-2xl font-bold dark:text-gray-100 font-serif">
          {title}
        </h2>
        {excerpt && <p className="text-gray-500 text-base">{excerpt}...</p>}
        <time className="text-xs font-bold" dateTime={date}>{new Date(date).toDateString()}</time>
      </div>
    </Link>
  );
}
