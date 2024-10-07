import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { ContextHandler } from "../types";
import { Gateway } from "./gateway";
import { Inquery } from "./inquary";
import { Reply } from "./reply";

export class Mx {
  private gateway: Gateway;

  constructor() {
    this.gateway = new Gateway();
  }

  /// mapping incoming request to the registered route and handler

  private async route(req: IncomingMessage, res: ServerResponse) {
    const inquery = new Inquery(req);
    const reply = new Reply(res);
    const handler = this.gateway.getRoute(inquery.method!, inquery.url!);

    if (!handler) {
      reply.status(404).send("Not Found");
      return;
    }

    handler({ inquery, reply });
  }

  /// listen to incoming requests
  public listen(
    port: number,
    hostname: string = "0.0.0.0",
    callback?: () => void | Promise<void>,
  ) {
    // console.log("listening on", port, hostname);
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
