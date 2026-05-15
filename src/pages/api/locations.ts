import type { APIRoute } from "astro";
import { readLocations } from "../../lib/adminData";

export const prerender = false;

export const GET: APIRoute = async () => {
  const items = await readLocations();

  return new Response(JSON.stringify({ items }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};
