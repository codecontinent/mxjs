/* eslint-disable no-unused-vars */
/// HTTP methods
export const httpMethods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "TRACE",
  "CONNECT",
] as const;

/// HTTP methods as type
export type HttpMethods = (typeof httpMethods)[number];

/// HTTP status codes
export enum HttpStatusCodes {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export type HttpStatusText = keyof typeof HttpStatusCodes;
export type HttpStatusCode = keyof typeof HttpStatusTexts;

export const HttpStatusTexts = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
} as const;

export const httpStatusTexts: Record<HttpStatusCodes, string> = {
  [HttpStatusCodes.OK]: "OK",
  [HttpStatusCodes.BAD_REQUEST]: "Bad Request",
  [HttpStatusCodes.NOT_FOUND]: "Not Found",
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatusCodes.CONTINUE]: "",
  [HttpStatusCodes.SWITCHING_PROTOCOLS]: "",
  [HttpStatusCodes.PROCESSING]: "",
  [HttpStatusCodes.EARLY_HINTS]: "",
  [HttpStatusCodes.CREATED]: "",
  [HttpStatusCodes.ACCEPTED]: "",
  [HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION]: "",
  [HttpStatusCodes.NO_CONTENT]: "",
  [HttpStatusCodes.RESET_CONTENT]: "",
  [HttpStatusCodes.PARTIAL_CONTENT]: "",
  [HttpStatusCodes.MULTI_STATUS]: "",
  [HttpStatusCodes.ALREADY_REPORTED]: "",
  [HttpStatusCodes.IM_USED]: "",
  [HttpStatusCodes.MULTIPLE_CHOICES]: "",
  [HttpStatusCodes.MOVED_PERMANENTLY]: "",
  [HttpStatusCodes.FOUND]: "",
  [HttpStatusCodes.SEE_OTHER]: "",
  [HttpStatusCodes.NOT_MODIFIED]: "",
  [HttpStatusCodes.USE_PROXY]: "",
  [HttpStatusCodes.TEMPORARY_REDIRECT]: "",
  [HttpStatusCodes.PERMANENT_REDIRECT]: "",
  [HttpStatusCodes.UNAUTHORIZED]: "",
  [HttpStatusCodes.PAYMENT_REQUIRED]: "",
  [HttpStatusCodes.FORBIDDEN]: "",
  [HttpStatusCodes.METHOD_NOT_ALLOWED]: "",
  [HttpStatusCodes.NOT_ACCEPTABLE]: "",
  [HttpStatusCodes.PROXY_AUTHENTICATION_REQUIRED]: "",
  [HttpStatusCodes.REQUEST_TIMEOUT]: "",
  [HttpStatusCodes.CONFLICT]: "",
  [HttpStatusCodes.GONE]: "",
  [HttpStatusCodes.LENGTH_REQUIRED]: "",
  [HttpStatusCodes.PRECONDITION_FAILED]: "",
  [HttpStatusCodes.PAYLOAD_TOO_LARGE]: "",
  [HttpStatusCodes.URI_TOO_LONG]: "",
  [HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE]: "",
  [HttpStatusCodes.RANGE_NOT_SATISFIABLE]: "",
  [HttpStatusCodes.EXPECTATION_FAILED]: "",
  [HttpStatusCodes.IM_A_TEAPOT]: "",
  [HttpStatusCodes.MISDIRECTED_REQUEST]: "",
  [HttpStatusCodes.UNPROCESSABLE_ENTITY]: "",
  [HttpStatusCodes.LOCKED]: "",
  [HttpStatusCodes.FAILED_DEPENDENCY]: "",
  [HttpStatusCodes.TOO_EARLY]: "",
  [HttpStatusCodes.UPGRADE_REQUIRED]: "",
  [HttpStatusCodes.PRECONDITION_REQUIRED]: "",
  [HttpStatusCodes.TOO_MANY_REQUESTS]: "",
  [HttpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE]: "",
  [HttpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS]: "",
  [HttpStatusCodes.NOT_IMPLEMENTED]: "",
  [HttpStatusCodes.BAD_GATEWAY]: "",
  [HttpStatusCodes.SERVICE_UNAVAILABLE]: "",
  [HttpStatusCodes.GATEWAY_TIMEOUT]: "",
  [HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED]: "",
  [HttpStatusCodes.VARIANT_ALSO_NEGOTIATES]: "",
  [HttpStatusCodes.INSUFFICIENT_STORAGE]: "",
  [HttpStatusCodes.LOOP_DETECTED]: "",
  [HttpStatusCodes.NOT_EXTENDED]: "",
  [HttpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED]: "",
};

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
