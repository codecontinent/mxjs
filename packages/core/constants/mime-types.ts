/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 */

//// MIME types
export type FILE_EXTENTIONS = keyof typeof MimeTypes;

export const MimeTypes = {
  json: {
    source: "iana",
    mimeType: "application/json",
    charset: "UTF-8",
  },
  xml: {
    source: "iana",
    mimeType: "application/xml",
    charset: "UTF-8",
  },
  html: {
    source: "iana",
    mimeType: "text/html",
    charset: "UTF-8",
  },
  htm: {
    source: "iana",
    mimeType: "text/html",
    charset: "UTF-8",
  },
  css: {
    source: "iana",
    mimeType: "text/css",
    charset: "UTF-8",
  },
  js: {
    source: "iana",
    mimeType: "text/javascript",
    charset: "UTF-8",
  },
  png: {
    source: "iana",
    mimeType: "image/png",
    charset: null,
  },
  jpeg: {
    source: "iana",
    mimeType: "image/jpeg",
    charset: null,
  },
  jpg: {
    source: "iana",
    mimeType: "image/jpeg",
    charset: null,
  },
  gif: {
    source: "iana",
    mimeType: "image/gif",
    charset: null,
  },
  svg: {
    source: "iana",
    mimeType: "image/svg+xml",
    charset: "UTF-8",
  },
  bin: {
    source: "iana",
    mimeType: "application/octet-stream",
    charset: null,
  },
  exe: {
    source: "iana",
    mimeType: "application/octet-stream",
    charset: null,
  },
  dll: {
    source: "iana",
    mimeType: "application/octet-stream",
    charset: null,
  },
  pdf: {
    source: "iana",
    mimeType: "application/pdf",
    charset: null,
  },
  zip: {
    source: "iana",
    mimeType: "application/zip",
    charset: null,
  },
  tar: {
    source: "iana",
    mimeType: "application/x-tar",
    charset: null,
  },
  gz: {
    source: "iana",
    mimeType: "application/x-gzip",
    charset: null,
  },
  txt: {
    source: "iana",
    mimeType: "text/plain",
    charset: "UTF-8",
  },
  csv: {
    source: "iana",
    mimeType: "text/csv",
    charset: "UTF-8",
  },
  md: {
    source: "iana",
    mimeType: "text/markdown",
    charset: "UTF-8",
  },
  xls: {
    source: "iana",
    mimeType: "application/vnd.ms-excel",
    charset: null,
  },
  xlsx: {
    source: "iana",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    charset: null,
  },
  ppt: {
    source: "iana",
    mimeType: "application/vnd.ms-powerpoint",
    charset: null,
  },
  pptx: {
    source: "iana",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    charset: null,
  },
  docx: {
    source: "iana",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    charset: null,
  },
  jsonapi: {
    source: "iana",
    mimeType: "application/vnd.api+json",
    charset: "UTF-8",
  },
  gdoc: {
    source: "iana",
    mimeType: "application/vnd.google-apps.document",
    charset: null,
  },
  gsheet: {
    source: "iana",
    mimeType: "application/vnd.google-apps.spreadsheet",
    charset: null,
  },
  gslides: {
    source: "iana",
    mimeType: "application/vnd.google-apps.presentation",
    charset: null,
  },
  odt: {
    source: "iana",
    mimeType: "application/vnd.oasis.opendocument.text",
    charset: null,
  },
  ods: {
    source: "iana",
    mimeType: "application/vnd.oasis.opendocument.spreadsheet",
    charset: null,
  },
  odp: {
    source: "iana",
    mimeType: "application/vnd.oasis.opendocument.presentation",
    charset: null,
  },
  swf: {
    source: "iana",
    mimeType: "application/x-shockwave-flash",
    charset: null,
  },
  vcf: {
    source: "iana",
    mimeType: "text/vcard",
    charset: null,
  },
  ttf: {
    source: "iana",
    mimeType: "application/x-font-ttf",
    charset: null,
  },
  otf: {
    source: "iana",
    mimeType: "application/x-font-opentype",
    charset: null,
  },
  woff: {
    source: "iana",
    mimeType: "application/x-font-woff",
    charset: null,
  },
  woff2: {
    source: "iana",
    mimeType: "application/x-font-woff2",
    charset: null,
  },
  eot: {
    source: "iana",
    mimeType: "application/vnd.ms-fontobject",
    charset: null,
  },
  ics: {
    source: "iana",
    mimeType: "text/calendar",
    charset: "UTF-8",
  },
  "7z": {
    source: "iana",
    mimeType: "application/x-7z-compressed",
    charset: null,
  },
  //... Add more MIME types as needed
};
