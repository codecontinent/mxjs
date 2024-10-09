/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 * @class Inquery
 */

import { IncomingMessage } from "node:http";
import { HttpMethods } from "../constants";

export class Inquery {
  private request: IncomingMessage;
  private _body: any;
  private _params: any;
  private _query: any;

  constructor(req: IncomingMessage) {
    this.request = req;
    this.query = {};
    this.params = {};
    this.body = null;

    // this.parseQuery();
  }

  public get headers() {
    return this.request.headers;
  }

  public get method() {
    return this.request.method as HttpMethods;
  }

  public get url() {
    return this.request.url;
  }

  public get body() {
    return this._body;
  }

  public get ip() {
    return this.request.socket.remoteAddress;
  }

  public get userAgent() {
    return this.request.headers["user-agent"];
  }

  public get referer() {
    return this.request.headers.referer;
  }

  public get origin() {
    return this.request.headers.origin;
  }

  public get host() {
    return this.request.headers.host;
  }

  public get protocol() {
    return (this.request.connection as any).encrypted ? "https" : "http";
  }

  public get params() {
    return this._params;
  }

  public get query() {
    return this._query;
  }

  public set body(data: any) {
    this._body = data;
  }

  public set params(data: Record<string, any>) {
    this._params = data;
  }

  public set query(data: Record<string, any>) {
    this._query = data;
  }
}
