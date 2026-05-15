import { readFile } from "node:fs/promises";
import {
  parseCsv,
  readCsvFile,
  resolveProjectPath,
  stringifyCsv,
  withFileLock,
  writeCsvFile
} from "./csv";

export const leadsFilePath = resolveProjectPath(import.meta.env.CONTACT_LEADS_FILE || "data/leads.csv");
export const locationsFilePath = resolveProjectPath(
  import.meta.env.TRAVEL_PHOTO_LOCATIONS_FILE || "public/data/travel-photo-locations.csv"
);

export const locationHeaders = ["城市", "点位名称", "场景类型", "设备类型", "状态", "说明", "关键词"];
const requiredLocationImportHeaders = ["城市", "点位名称", "场景类型", "设备类型", "状态"];
const locationHeaderAliases: Record<string, string[]> = {
  城市: ["城市", "城市/省份", "省份", "省市", "省/市"],
  点位名称: ["点位名称", "点位名", "景区名称", "景区名", "名称"],
  场景类型: ["场景类型", "场景"],
  设备类型: ["设备类型", "设备"],
  状态: ["状态", "覆盖状态"],
  说明: ["说明", "描述", "介绍"],
  关键词: ["关键词", "关键字", "搜索关键词"]
};

function findLocationImportHeader(headers: string[], targetHeader: string) {
  const aliases = locationHeaderAliases[targetHeader] ?? [targetHeader];
  return aliases.find((alias) => headers.includes(alias));
}

export function normalizeLeadRow(row: Record<string, string>, index: number) {
  return {
    id: index,
    submittedAt: row["提交时间"] ?? "",
    name: row["姓名"] ?? "",
    company: row["公司"] ?? "",
    phone: row["手机号"] ?? row["电话"] ?? "",
    product: row["咨询产品"] ?? "",
    ip: row["来源IP"] ?? ""
  };
}

export function normalizeLocationRow(row: Record<string, string>, index: number) {
  return {
    id: index,
    city: row["城市"] ?? "",
    spotName: row["点位名称"] ?? "",
    sceneType: row["场景类型"] ?? "",
    deviceType: row["设备类型"] ?? "",
    status: row["状态"] ?? "",
    description: row["说明"] ?? "",
    keywords: row["关键词"] ?? ""
  };
}

export function locationPayloadToRow(payload: Record<string, unknown>) {
  const row = {
    城市: String(payload.city ?? "").trim().slice(0, 80),
    点位名称: String(payload.spotName ?? "").trim().slice(0, 120),
    场景类型: String(payload.sceneType ?? "").trim().slice(0, 80),
    设备类型: String(payload.deviceType ?? "").trim().slice(0, 80),
    状态: String(payload.status ?? "").trim().slice(0, 40),
    说明: String(payload.description ?? "").trim().slice(0, 500),
    关键词: String(payload.keywords ?? "").trim().slice(0, 300)
  };

  if (!row.城市 || !row.点位名称 || !row.场景类型 || !row.设备类型 || !row.状态) {
    throw new Error("请完整填写城市、点位名称、场景类型、设备类型和状态");
  }

  return row;
}

export async function readLeads() {
  const { rows } = await readCsvFile(leadsFilePath);
  return rows.map(normalizeLeadRow);
}

export async function readLeadsCsvText() {
  try {
    return await readFile(leadsFilePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return stringifyCsv(["提交时间", "姓名", "公司", "手机号", "咨询产品", "来源IP"], [], true);
    }

    throw error;
  }
}

export async function readLocations() {
  const { rows } = await readCsvFile(locationsFilePath);
  return rows.map(normalizeLocationRow);
}

export async function updateLocations(task: (rows: Record<string, string>[]) => Record<string, unknown>[]) {
  return withFileLock(locationsFilePath, async () => {
    const { rows } = await readCsvFile(locationsFilePath);
    const nextRows = task(rows);
    await writeCsvFile(locationsFilePath, locationHeaders, nextRows);
    return nextRows.map((row, index) => normalizeLocationRow(row as Record<string, string>, index));
  });
}

export function parseLocationImport(csvText: string) {
  const { headers, rows } = parseCsv(csvText);
  const headerMap = locationHeaders.reduce<Record<string, string | undefined>>((map, header) => {
    map[header] = findLocationImportHeader(headers, header);
    return map;
  }, {});
  const missingHeaders = requiredLocationImportHeaders.filter((header) => !headerMap[header]);

  if (missingHeaders.length) {
    throw new Error(`CSV 缺少字段：${missingHeaders.join("、")}`);
  }

  if (!rows.length) {
    throw new Error("CSV 没有可导入的数据");
  }

  return rows.map((row) => locationPayloadToRow({
    city: row[headerMap["城市"] ?? ""],
    spotName: row[headerMap["点位名称"] ?? ""],
    sceneType: row[headerMap["场景类型"] ?? ""],
    deviceType: row[headerMap["设备类型"] ?? ""],
    status: row[headerMap["状态"] ?? ""],
    description: row[headerMap["说明"] ?? ""] ?? "",
    keywords: row[headerMap["关键词"] ?? ""] ?? ""
  }));
}
