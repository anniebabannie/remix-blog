import { json, LoaderFunctionArgs, } from "@remix-run/node";
import { Link,  Outlet,  useLoaderData } from "@remix-run/react";
import { BlogPost as BlogPostType } from '~/types';
import { getPosts } from '~/utils/blog.server';
import BlogPost from '~/components/BlogPost';
import { CacheControl } from "~/utils/cache-control.server";
import { getSeoMeta } from "~/seo";
import logo from "~/assets/annie-sexton-logo.png";

export let meta = ({ context }) => {
	let seoMeta = getSeoMeta({
		title: `Blog`
	});
	return [{
		...seoMeta,
	}];
};


export default function Blog() {
  return (
    <div>
      <nav className="flex gap-5 items-center p-10">
        <Link to="/"><img src={logo} className="max-w-[250px] max-h-[76px] w-full mb-1"/></Link>
        <span className="text-gray-400">/</span>
        <Link to="/blog" className="text-gray-400 uppercase text-xl tracking-widest">Blog</Link>
      </nav>
      <Outlet/>
    </div>
  );
}

// export const ErrorBoundary = ({error}) => {
//   return (
//     <main>
//       <h1>Unable to fetch list of blog posts. Please check back later</h1>
//     </main>
//   )
// }
