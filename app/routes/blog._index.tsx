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
    <div className="flex flex-col items-start justify-center w-full max-w-5xl mx-auto mb-16">
      <div className="flex flex-col w-full text-center mb-16">
        <h1 className="font-serif dark:text-gray-200 text-gray-700 h1">Howdy, friend.</h1>
        <p className="max-w-2xl text-gray-500 dark:text-gray-300 mx-auto"> My name is Annie, and I write about software engineering, product development, and tech-shenanigans.</p>
      </div>
      <div className="flex flex-col px-6 md:grid md:grid-cols-2 gap-8">
        {data.blogPosts.slice(0, 10).map(post => (
          <BlogPost key={post.url}
            date={post.attributes.date}
            title={post.attributes.meta.title}
            slug={post.url}
            excerpt={post.attributes.excerpt}
            thumbnail={post.attributes.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}