import type {
	LoaderFunctionArgs,
	HeadersFunction,
	SerializeFrom,
} from "@remix-run/node";
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useLocation, useRouteLoaderData } from '@remix-run/react'

import invariant from "tiny-invariant";
import { MDXPage } from "~/components/MdxPage";
import { getContent } from "~/utils/blog.server";
import { mdxSerialize } from "~/utils/mdx.server";
import { CacheControl } from "~/utils/cache-control.server";
import { getSeoMeta, getSeoLinks } from "~/seo";

export const loader = async ({params}: LoaderFunctionArgs) => {
	let path = params["*"];

	invariant(path, "BlogPost: path is required");

	if (!path) return redirect("/blog");

	const files = await getContent(`posts/${path}`);
	let post = files && await mdxSerialize(files[0].content);
	invariant(post, "Not found");
	return json({post}, {
		headers: { 
			"Cache-Control": new CacheControl("swr").toString() 
		}
	})
}

export const headers: HeadersFunction = ({loaderHeaders}) => {
	return {
		'Cache-Control': loaderHeaders.get('Cache-Control')!
	}
}

export const meta = ({data}) => {
	if (!data) return {};
	let { post } = data as SerializeFrom<typeof loader>;

	let seoMeta = getSeoMeta({
		title: post.frontmatter.meta.title,
		description: post.frontmatter.meta.description,
	});
	return [{
		...seoMeta,
	}];
}

export const links = () => {
	let seoLinks = getSeoLinks();
	return [...seoLinks];
};

export default function BlogPost() {
	const {post} = useLoaderData<typeof loader>();
	const location = useLocation();
  const { pathname } = location;
	const { env } = useRouteLoaderData('root') as { env: { BUCKET_NAME: string, AWS_ENDPOINT_URL_S3: string } };
	console.log(post)
	return (
		<article className="post flex flex-col items-start justify-center mb-16 px-6">
			<div className="w-full max-w-2xl mx-auto">
				<h1 className="font-serif dark:text-gray-200 text-gray-700">{post.frontmatter.meta.title}</h1>
					<div className="text-center mb-8">
						<time className="text-sm text-gray-400" dateTime={post.frontmatter.date}>Written and illustrated by Annie Sexton • {new Date(post.frontmatter.date).toDateString()}</time>
					</div>
			</div>
			<div className="w-full max-w-4xl mx-auto">
				<img className="rounded-lg mb-10 mt-5 shadow-lg object-cover object-center" src={`${env.AWS_ENDPOINT_URL_S3}/${env.BUCKET_NAME}${pathname}/${post.frontmatter.thumbnail}`} alt={post.frontmatter.alt} />
			</div>
			<div className="w-full max-w-2xl mx-auto">
				<div className="w-full mt-4 dark:text-gray-200 text-gray-700 max-w-none">
					<MDXPage code={post.code}/>
				</div>
			</div>
		</article>
	)
}
