import type { APIRoute } from "astro";
import {
  adminCookieName,
  createAdminSessionToken,
  validateAdminCredentials
} from "../../../lib/adminAuth";

export const prerender = false;

function json(message: string, status = 200) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export const POST: APIRoute = async ({ request, cookies, url }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json("登录内容格式不正确", 400);
  }

  const username = String(payload.username ?? "").trim();
  const password = String(payload.password ?? "");

  if (!validateAdminCredentials(username, password)) {
    return json("账号或密码不正确", 401);
  }

  cookies.set(adminCookieName, createAdminSessionToken(), {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: url.protocol === "https:"
  });

  return json("登录成功");
};
