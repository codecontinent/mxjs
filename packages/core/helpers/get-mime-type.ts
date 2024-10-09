/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 */

import { FILE_EXTENTIONS, MimeTypes } from "../constants";

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
