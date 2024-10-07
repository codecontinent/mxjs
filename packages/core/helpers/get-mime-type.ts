import { FILE_EXTENTIONS, MimeTypes } from "../lib/constants";

/**
 * Get mime type from file name or extension
 * @param {string} ext - file extension
 * @returns {string}
 * @example getMimeType("html") // text/html
 */
export function getMimeType(ext: FILE_EXTENTIONS): string {
  // find mime type from constants
  const { mimeType } = MimeTypes[ext as FILE_EXTENTIONS];
  return mimeType;
}
