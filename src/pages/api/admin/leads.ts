import type { APIRoute } from "astro";
import { isAdminRequest, unauthorized } from "../../../lib/adminAuth";
import { readLeads, readLeadsCsvText } from "../../../lib/adminData";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (url.searchParams.get("download") === "1") {
    return new Response(await readLeadsCsvText(), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="leads.csv"'
      }
    });
  }

  return new Response(JSON.stringify({ items: await readLeads() }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};
