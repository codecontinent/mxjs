import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { ContextHandler } from "../types";
import { HttpMethods } from "./constants";
import { Gateway } from "./gateway";

export class Mx {
  private gateway: Gateway;

  constructor() {
    console.log("mx");
    this.gateway = new Gateway();
  }

  /// raw-nodejs request handler
  public handler(req: IncomingMessage, res: ServerResponse) {
    // handle request
    console.log("request received", req.url, req.socket.remoteAddress);
    res.end("Hello World");
  }

  /// mapping incoming request to the registered route and handler
  public route(req: IncomingMessage, res: ServerResponse) {
    const path = req.url;
    const method = req.method as HttpMethods;

    const handler = this.gateway.getRoute(`${method}:${path}`);

    if (!handler) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    handler({
      inquary: req,
      reply: res,
    });
  }

  /// listen to incoming requests
  public listen(
    port: number,
    hostname: string,
    callback: () => void | Promise<void>,
  ) {
    console.log("listening on", port, hostname);
    const server = createServer(this.route.bind(this));
    server.listen(port, hostname, callback);
  }

  /// register a route
  public get(path: string, handler: ContextHandler) {
    this.gateway.get(path, handler);
  }

  public post(path: string, handler: ContextHandler) {
    this.gateway.post(path, handler);
  }

  public put(path: string, handler: ContextHandler) {
    this.gateway.put(path, handler);
  }

  public delete(path: string, handler: ContextHandler) {
    this.gateway.delete(path, handler);
  }

  public patch(path: string, handler: ContextHandler) {
    this.gateway.patch(path, handler);
  }

  public options(path: string, handler: ContextHandler) {
    this.gateway.options(path, handler);
  }

  public head(path: string, handler: ContextHandler) {
    this.gateway.head(path, handler);
  }

  public trace(path: string, handler: ContextHandler) {
    this.gateway.trace(path, handler);
  }

  public connect(path: string, handler: ContextHandler) {
    this.gateway.connect(path, handler);
  }
}
