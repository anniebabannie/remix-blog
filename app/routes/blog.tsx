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
    <div className="bg-[url('assets/light-gradient-bg.png')] dark:bg-dark-mode-gradient bg-cover min-h-screen">
      <nav className="flex gap-5 items-center p-10">
        <Link to="/"><img src={logo} className="max-w-[250px] max-h-[76px] w-full mb-1"/></Link>
        <span className="text-gray-400 dark:text-gray-100 ">/</span>
        <Link to="/blog" className="text-gray-400 dark:text-gray-100 uppercase text-xl tracking-widest">Blog</Link>
      </nav>
      <Outlet/>
      <footer className="flex items-center justify-center py-20 pb-36">
        <div className="flex flex-col items-center md:flex md:flex-row gap-6">
          <div className="dark:text-gray-200">Follow Annie on Twitter <a href="https://twitter.com/_anniebabannie_" target="_blank">@_anniebabannie_</a></div>
          <div className="dark:text-gray-200">•</div>
          <div className="dark:text-gray-200">© {new Date().getFullYear()} Annie Sexton</div>
        </div>
      </footer>
    </div>
  );
}

export const ErrorBoundary = ({error}) => {
  return (
    <main>
      <h1>Unable to fetch list of blog posts. Please check back later</h1>
    </main>
  )
}