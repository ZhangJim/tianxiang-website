import type { APIRoute } from "astro";
import { adminCookieName } from "../../../lib/adminAuth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(adminCookieName, { path: "/" });

  return new Response(JSON.stringify({ message: "已退出登录" }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};
