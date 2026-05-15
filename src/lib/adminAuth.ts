import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "tx_admin_session";

const sessionHours = 8;

function getAdminUsername() {
  return import.meta.env.ADMIN_USERNAME || "admin";
}

function getAdminPassword() {
  return import.meta.env.ADMIN_PASSWORD || "admin123456";
}

function getSessionSecret() {
  return import.meta.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function validateAdminCredentials(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword();
}

export function createAdminSessionToken() {
  const expiresAt = Date.now() + sessionHours * 60 * 60 * 1000;
  const payload = String(expiresAt);

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }

  return safeEqual(sign(expiresAt), signature);
}

export function getCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
}

export function isAdminRequest(request: Request) {
  return verifyAdminSessionToken(getCookieValue(request, adminCookieName));
}

export function unauthorized() {
  return new Response(JSON.stringify({ message: "未登录或登录已过期" }), {
    status: 401,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
