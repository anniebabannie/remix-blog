import { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction, json } from "@remix-run/node";
import {
  Links,
  useLoaderData,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload
} from "@remix-run/react";
import posthog from 'posthog-js'
import { CacheControl } from "~/utils/cache-control.server";

import { getSeo } from "~/seo";
let [seoMeta, seoLinks] = getSeo();

import tailwindStyles from "./tailwind.css"
import { useEffect } from "react";

export const handle = {
  id: 'root',
}
export const meta: MetaFunction = () => {
  return [
    {
      ...seoMeta,
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1",
    }
  ]
};

export const links: LinksFunction = () => [
  ...seoLinks,
  { rel: "preconnect", href: "//fonts.gstatic.com", crossOrigin: "anonymous" },
  {rel: "stylesheet", href: tailwindStyles},
  { rel: "stylesheet", href: "//fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@100..900&display=swap" },
]

export const headers: HeadersFunction = () => {
  return { "Cache-Control": new CacheControl("swr").toString() };
};

export async function loader() {
  return json({
    env: {
      BUCKET_NAME: process.env.BUCKET_NAME,
      AWS_ENDPOINT_URL_S3: process.env.AWS_ENDPOINT_URL_S3,
    }
  })
}


export default function App() {
  useEffect(() => {
    posthog.init('phc_d6IEyEGy1uZbis3asripLPSCv9pDG9TliItH3dvx9Gf', {
       api_host: 'https://app.posthog.com',
       loaded: function (posthog) {
        if (
          location?.hostname === 'localhost' ||
          location?.hostname === '127.0.0.1'
        ) {
          posthog.opt_out_capturing();
        }
      },
    })
  },[])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload/>
      </body>
    </html>
  );
}