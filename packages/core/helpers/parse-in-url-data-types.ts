/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 */

/**
 * parse data type from url
 * @param value string
 * @returns any (dynamic)
 */
function parseDataTypeFromUrl(value: string) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value === "undefined") return undefined;
  if (!isNaN(Number(value))) return Number(value);

  return JSON.parse(value.replace(/'/g, '"'));
}

/**
 * parse query from url text
 * @param url string
 * @returns Record<string, any>
 */
export function parseQueryFromUrlText(url: string) {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const params: Record<string, any> = {};
  for (const [key, value] of searchParams) {
    if (value.includes(",")) {
      params[key] = value.split(",").map((it) => parseDataTypeFromUrl(it));
      continue;
    }
    params[key] = parseDataTypeFromUrl(value);
  }
  return params;
}
