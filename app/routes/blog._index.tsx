import { json, LoaderFunctionArgs, } from "@remix-run/node";
import { Link,  Outlet,  useLoaderData } from "@remix-run/react";
import { BlogPost as BlogPostType } from '~/types';
import { getPosts } from '~/utils/blog.server';
import BlogPost from '~/components/BlogPost';
import { CacheControl } from "~/utils/cache-control.server";
import { getSeoMeta } from "~/seo";

export let meta = () => {
	let seoMeta = getSeoMeta({
		title: `Blog`
	});
	return [{
      ...seoMeta,
  }];
}

export let loader = async function({}: LoaderFunctionArgs) {
  return json({
    blogPosts: await getPosts(),
  }, {
    headers: {
      "Cache-Control": new CacheControl("swr").toString(),
    }
  });
}

export default function BlogList() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
        </p>
          {data.blogPosts.slice(0, 10).map(post => (
            <BlogPost key={post.url}
              title={post.attributes.meta.title}
              slug={post.url}
              excerpt={post.attributes.excerpt}
            />
          ))}
      </div>
  )
}