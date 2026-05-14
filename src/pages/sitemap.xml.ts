import { seo } from "../data/site";
import { rentalMachines } from "../data/rental";

export const prerender = false;

const pages = [
  ...Object.keys(seo.pages),
  ...rentalMachines.map((machine) => `/rental/${machine.slug}/`)
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET({ url }: { url: URL }) {
  const siteOrigin = import.meta.env.PUBLIC_SITE_URL || url.origin;
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((path) => {
      const priority = path === "/" ? "1.0" : path.includes("/terminals/") || path.includes("/compute/") ? "0.8" : "0.7";

      return [
        "  <url>",
        `    <loc>${escapeXml(new URL(path, siteOrigin).toString())}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${priority}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urls,
      "</urlset>"
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
