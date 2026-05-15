import { seo } from "../data/site";

export const prerender = false;

const publicPages = Object.keys(seo.pages);

export function GET({ url }: { url: URL }) {
  const siteOrigin = import.meta.env.PUBLIC_SITE_URL || url.origin;
  const allowRules = publicPages.map((path) => `Allow: ${path}`).join("\n");

  return new Response(
    [
      "User-agent: *",
      "Disallow: /api/",
      "Disallow: /admin/",
      allowRules,
      `Sitemap: ${new URL("/sitemap.xml", siteOrigin).toString()}`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
