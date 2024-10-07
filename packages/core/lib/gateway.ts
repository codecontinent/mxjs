import type { ContextHandler } from "../types";
import { HttpMethods } from "./constants";

export class Gateway {
  private routes: Map<string, ContextHandler>;

  constructor() {
    this.routes = new Map();
  }

  public register(path: string, method: HttpMethods, handler: ContextHandler) {
    if (this.routes.has(path)) {
      // overwrite the existing route, instead of throwing an error
      console.warn(`Route ${path} already exists, overwriting...`);
      this.routes.set(`${method}:${path}`, handler);
    }

    this.routes.set(`${method}:${path}`, handler);
  }

  public getRoute(method: string, path: string) {
    return this.routes.get(`${method}:${path}`);
  }

  public getRoutes() {
    return this.routes;
  }

  public get(path: string, handler: ContextHandler) {
    this.register(path, "GET", handler);
  }

  public post(path: string, handler: ContextHandler) {
    this.register(path, "POST", handler);
  }

  public put(path: string, handler: ContextHandler) {
    this.register(path, "PUT", handler);
  }

  public delete(path: string, handler: ContextHandler) {
    this.register(path, "DELETE", handler);
  }

  public patch(path: string, handler: ContextHandler) {
    this.register(path, "PATCH", handler);
  }

  public options(path: string, handler: ContextHandler) {
    this.register(path, "OPTIONS", handler);
  }

  public head(path: string, handler: ContextHandler) {
    this.register(path, "HEAD", handler);
  }

  public trace(path: string, handler: ContextHandler) {
    this.register(path, "TRACE", handler);
  }

  public connect(path: string, handler: ContextHandler) {
    this.register(path, "CONNECT", handler);
  }
}
