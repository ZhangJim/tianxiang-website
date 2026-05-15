import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const locks = new Map<string, Promise<void>>();

export function resolveProjectPath(configuredPath: string) {
  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(process.cwd(), configuredPath);
}

export async function withFileLock<T>(filePath: string, task: () => Promise<T>) {
  const previous = locks.get(filePath) ?? Promise.resolve();
  let release!: () => void;
  const next = new Promise<void>((resolve) => {
    release = resolve;
  });
  const current = previous.then(() => next);

  locks.set(filePath, current);
  await previous;

  try {
    return await task();
  } finally {
    release();

    if (locks.get(filePath) === current) {
      locks.delete(filePath);
    }
  }
}

export function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

export function parseCsv(text: string) {
  const cleanText = text.replace(/^\uFEFF/, "").trim();

  if (!cleanText) {
    return { headers: [] as string[], rows: [] as Record<string, string>[] };
  }

  const lines = cleanText.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines.shift() ?? "");
  const rows = lines.map((line) => {
    const cells = parseCsvLine(line);
    return headers.reduce<Record<string, string>>((row, header, index) => {
      row[header] = cells[index] ?? "";
      return row;
    }, {});
  });

  return { headers, rows };
}

export function csvCell(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

export function stringifyCsv(headers: string[], rows: Record<string, unknown>[], withBom = false) {
  const body = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))
  ].join("\n");

  return `${withBom ? "\uFEFF" : ""}${body}\n`;
}

export async function readCsvFile(filePath: string) {
  try {
    return parseCsv(await readFile(filePath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { headers: [] as string[], rows: [] as Record<string, string>[] };
    }

    throw error;
  }
}

export async function backupFile(filePath: string) {
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+Z$/, "");
    const backupPath = `${filePath}.${timestamp}.bak`;
    await writeFile(backupPath, await readFile(filePath));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

export async function writeCsvFile(filePath: string, headers: string[], rows: Record<string, unknown>[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await backupFile(filePath);

  const tempPath = `${filePath}.tmp`;
  await writeFile(tempPath, stringifyCsv(headers, rows, true), "utf8");
  await rename(tempPath, filePath);
}
