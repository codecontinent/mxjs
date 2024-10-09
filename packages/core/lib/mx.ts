/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 * @class MxJs - The main class that acts as the entry point for the application.
 */

import { createServer, Server } from "node:http";
import { ContextHandler } from "../types";
import { Gateway } from "./gateway";

/*
|===============================================================================
| MxJs
| (c) 2024, Mahabub
| @version 0.1.0 (alpha)
| -----------------------------------------------------------------------------
| The main class that acts as the entry point for the application.
| It is responsible for handling incoming requests and routing them to the
| appropriate handlers.
|===============================================================================
*/
export class MxJs {
  private gateway: Gateway;
  private httpServer: Server | null;

  constructor() {
    this.gateway = new Gateway();
    this.httpServer = null;
  }

  public bootstrap() {
    this.httpServer = createServer(this.gateway.handle());
    return this;
  }

  /// HANDLE incoming REQUESTs
  public execute(
    port?: number,
    hostOrCallback?: string | (() => void | Promise<void>),
    callback?: () => void | Promise<void>,
  ): void {
    if (!this.httpServer) {
      throw new Error("Server is not ready yet!");
    }

    if (typeof hostOrCallback === "string") {
      if (callback) {
        this.httpServer.listen(port, hostOrCallback, callback);
        return;
      }
      this.httpServer.listen(port, hostOrCallback);
      return;
    } else if (hostOrCallback) this.httpServer.listen(port, hostOrCallback);
    else if (port) this.httpServer.listen(port, "127.0.0.1");
    else this.httpServer.listen(3080, "127.0.0.1");
  }
  /// -------------------------

  // Short access to HTTP Methods
  public get(path: string, handler: ContextHandler): void {
    this.gateway.get(path, handler);
  }

  public post(path: string, handler: ContextHandler): void {
    this.gateway.post(path, handler);
  }

  public put(path: string, handler: ContextHandler): void {
    this.gateway.put(path, handler);
  }

  public delete(path: string, handler: ContextHandler): void {
    this.gateway.delete(path, handler);
  }

  public patch(path: string, handler: ContextHandler): void {
    this.gateway.patch(path, handler);
  }

  public head(path: string, handler: ContextHandler): void {
    this.gateway.head(path, handler);
  }

  public options(path: string, handler: ContextHandler): void {
    this.gateway.options(path, handler);
  }

  public trace(path: string, handler: ContextHandler): void {
    this.gateway.trace(path, handler);
  }

  public connect(path: string, handler: ContextHandler): void {
    this.gateway.connect(path, handler);
  }

  public module(basePath: string, sub: Gateway | MxJs): void {
    if (sub instanceof MxJs) {
      this.gateway.module(basePath, sub.gateway);
      return;
    }

    this.gateway.module(basePath, sub);
  }
}
