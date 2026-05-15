import type { APIRoute } from "astro";
import { isAdminRequest, unauthorized } from "../../../lib/adminAuth";
import {
  locationHeaders,
  locationPayloadToRow,
  parseLocationImport,
  readLocations,
  updateLocations
} from "../../../lib/adminData";
import { stringifyCsv } from "../../../lib/csv";

export const prerender = false;

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

async function readJson(request: Request) {
  try {
    return await request.json() as Record<string, unknown>;
  } catch {
    throw new Error("请求内容格式不正确");
  }
}

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const items = await readLocations();

  if (url.searchParams.get("download") === "1") {
    const rows = items.map((item) => ({
      城市: item.city,
      点位名称: item.spotName,
      场景类型: item.sceneType,
      设备类型: item.deviceType,
      状态: item.status,
      说明: item.description,
      关键词: item.keywords
    }));

    return new Response(stringifyCsv(locationHeaders, rows, true), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="travel-photo-locations.csv"'
      }
    });
  }

  return json({ items });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const payload = await readJson(request);
    const row = locationPayloadToRow(payload);
    const items = await updateLocations((rows) => [...rows, row]);

    return json({ items, message: "已新增点位" });
  } catch (error) {
    return json({ message: (error as Error).message }, 400);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const payload = await readJson(request);
    const id = Number(payload.id);
    const row = locationPayloadToRow(payload);

    if (!Number.isInteger(id) || id < 0) {
      return json({ message: "无效的点位编号" }, 400);
    }

    const items = await updateLocations((rows) => {
      if (!rows[id]) {
        throw new Error("未找到要修改的点位");
      }

      const nextRows = [...rows];
      nextRows[id] = row;
      return nextRows;
    });

    return json({ items, message: "已保存点位" });
  } catch (error) {
    return json({ message: (error as Error).message }, 400);
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const payload = await readJson(request);
    const id = Number(payload.id);

    if (!Number.isInteger(id) || id < 0) {
      return json({ message: "无效的点位编号" }, 400);
    }

    const items = await updateLocations((rows) => rows.filter((_, index) => index !== id));

    return json({ items, message: "已删除点位" });
  } catch (error) {
    return json({ message: (error as Error).message }, 400);
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const payload = await readJson(request);
    const mode = String(payload.mode ?? "replace");
    const csvText = String(payload.csvText ?? "");
    const importedRows = parseLocationImport(csvText);

    const items = await updateLocations((rows) => {
      if (mode === "append") {
        return [...rows, ...importedRows];
      }

      return importedRows;
    });

    return json({ items, message: mode === "append" ? "已追加导入点位" : "已覆盖导入点位" });
  } catch (error) {
    return json({ message: (error as Error).message }, 400);
  }
};
