import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";

export const prerender = false;

const phonePattern = /^1[3-9]\d{9}$/;

const productLabels = new Set([
  "AI算力服务",
  "模型接入",
  "整机租赁",
  "AI旅拍机",
  "AI潮玩卡牌机",
  "AI机器猫",
  "其他合作"
]);

const configuredLeadsFile = import.meta.env.CONTACT_LEADS_FILE || "data/leads.csv";
const leadsFile = path.isAbsolute(configuredLeadsFile)
  ? configuredLeadsFile
  : path.join(process.cwd(), configuredLeadsFile);
const leadsDir = path.dirname(leadsFile);
const csvHeader = "\uFEFF提交时间,姓名,公司,手机号,咨询产品,来源IP\n";

function json(message: string, status = 200) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function sanitize(value: unknown) {
  return String(value ?? "").trim().slice(0, 120);
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

async function ensureCsvFile() {
  await mkdir(leadsDir, { recursive: true });

  const file = await open(leadsFile, "a+");
  const stat = await file.stat();

  if (stat.size === 0) {
    await file.write(csvHeader);
  }

  return file;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json("提交内容格式不正确", 400);
  }

  const name = sanitize(payload.name);
  const company = sanitize(payload.company);
  const phone = sanitize(payload.phone).replace(/\s+/g, "");
  const product = sanitize(payload.product);

  if (!name || !company || !phone || !product) {
    return json("请完整填写表单信息", 400);
  }

  if (!phonePattern.test(phone)) {
    return json("请输入正确的手机号", 400);
  }

  if (!productLabels.has(product)) {
    return json("请选择有效的咨询产品", 400);
  }

  const submittedAt = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false
  });
  const sourceIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    clientAddress ||
    "";

  const row = [submittedAt, name, company, phone, product, sourceIp].map(csvCell).join(",") + "\n";

  let file: Awaited<ReturnType<typeof ensureCsvFile>> | undefined;

  try {
    file = await ensureCsvFile();
    await file.write(row);
  } catch (error) {
    console.error("Failed to write contact lead:", error);
    return json("提交失败，请稍后重试", 500);
  } finally {
    await file?.close();
  }

  return json("已提交，我们会尽快联系您。");
};

export const GET: APIRoute = async () => {
  return json("请通过表单提交咨询信息", 405);
};
