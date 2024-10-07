import { ServerResponse } from "node:http";
import { getMimeType } from "../helpers";
import { HttpStatusCode, httpStatusTexts } from "./constants";

export class Reply {
  private response: ServerResponse;
  private baseHeaders: Record<string, string> = {
    "X-Powered-By": "Mx.js",
    "Content-Type": getMimeType("txt"),
    "Cache-Control": "no-cache",
  };

  constructor(res: ServerResponse) {
    this.response = res;
    this.baseHeaders["X-HTTP-Version"] =
      this.response.req?.httpVersion || "1.1";
    for (const key in this.baseHeaders) {
      this.response.setHeader(key, this.baseHeaders[key]);
    }
    this.response.statusMessage = httpStatusTexts[200]; // Default status message
    this.response.statusCode = 200; // Default status code
  }

  // set status code
  status(code: HttpStatusCode) {
    this.response.statusCode = code;
    this.response.statusMessage = httpStatusTexts[code];
    return this;
  }

  // set status message
  statusText(txt: string) {
    this.response.statusMessage = txt;
    return this;
  }

  // send response with JSON data
  json(data: any) {
    this.response.setHeader("Content-Type", getMimeType("json"));
    this.send(JSON.stringify(data));
  }

  // send response with HTML data
  html(data: string) {
    this.response.setHeader("Content-Type", getMimeType("html"));
    this.send(data);
  }

  // send response normally
  send(data: any) {
    this.response.end(data);
  }

  // just send status code only
  sendStatus(code: HttpStatusCode) {
    this.response.statusCode = code;
    this.response.statusMessage = httpStatusTexts[code];
    this.response.end();
  }
}
