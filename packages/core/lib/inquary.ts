import { IncomingMessage } from "node:http";

export class Inquery {
  private request: IncomingMessage;
  private _body: any;

  constructor(req: IncomingMessage) {
    this.request = req;
  }

  public get headers() {
    return this.request.headers;
  }

  public get method() {
    return this.request.method;
  }

  public get url() {
    return this.request.url;
  }

  public get body() {
    return this._body;
  }

  public set body(data: any) {
    this._body = data;
  }

  public get query() {
    const url = new URL(this.request.url!, this.request.headers.host);
    return Object.fromEntries(url.searchParams);
  }

  public get params() {
    const url = new URL(this.request.url!, this.request.headers.host);
    return Object.fromEntries(url.searchParams);
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
}
