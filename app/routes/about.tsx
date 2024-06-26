import type {
	LoaderFunctionArgs,
	MetaFunction,
	HeadersFunction,
	SerializeFrom,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react'

import invariant from "tiny-invariant";
import { MDXPage } from "~/components/MdxPage";
import { getContent } from "~/utils/blog.server";
import { mdxSerialize } from "~/utils/mdx.server";
import { CacheControl } from "~/utils/cache-control.server";
import { getSeoMeta } from "~/seo";

export const loader = async ({params}: LoaderFunctionArgs) => {
	const files = await getContent(`pages/about`);
	let post = files && await mdxSerialize(files[0].content);

	invariant(post, "Not found");

	return json({post}, {
		headers: {
			"Cache-Control": new CacheControl("swr").toString(),
		}
	})
}

export const headers: HeadersFunction = ({loaderHeaders}) => {
	return {
		'Cache-Control': loaderHeaders.get('Cache-Control')!
	}
}

export const meta: MetaFunction = ({data}) => {
	if (!data) return {};
	let { post } = data as SerializeFrom<typeof loader>;

	let seoMeta = getSeoMeta({
		title: post.frontmatter.meta.title,
		description: post.frontmatter.meta.description,
	});
	return {
		...seoMeta,
	};
}

export default function BlogPost() {
	const {post} = useLoaderData<typeof loader>();

	return (
		<article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
			<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">{post.frontmatter.meta.title}</h1>
			<div className="w-full mt-4 prose dark:prose-dark max-w-none">
				<MDXPage code={post.code} />
			</div>
		</article>
	)
}
