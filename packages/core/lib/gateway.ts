/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 * @class Inquery
 */

import { IncomingMessage, ServerResponse } from "node:http";
import { HttpMethods } from "../constants";
import { parseQueryFromUrlText } from "../helpers";
import { ContextHandler } from "../types";
import { Inquery } from "./inquary";
import { Reply } from "./reply";
import { Route } from "./route";

export class Gateway {
  routes: Route[];
  modules: Map<string, Gateway> = new Map();
  prefix: string;

  constructor(prefix = "") {
    this.routes = [];
    this.prefix = prefix;
  }

  private normalizePath(path: string): string {
    return path === "/" ? "/" : path.replace(/\/$/, "");
  }

  private isParameterizedPath(path: string): boolean {
    return path.includes(":") || path.includes("*");
  }

  private buildPattern(path: string): {
    pattern: RegExp;
    paramNames: string[];
  } {
    const paramNames: string[] = [];
    const patternString = path
      .replace(/:\w+/g, (match) => {
        paramNames.push(match.slice(1));
        return "([^/]+)";
      })
      .replace(/\*/g, "(.*)");
    return { pattern: new RegExp(`^${patternString}$`), paramNames };
  }

  // Register a route
  register(method: HttpMethods, path: string, handler: ContextHandler): void {
    const fullPath = this.prefix + path;
    const normalizedPath = this.normalizePath(fullPath);
    if (this.isParameterizedPath(normalizedPath)) {
      const { pattern, paramNames } = this.buildPattern(normalizedPath);
      this.routes.push(
        new Route(method, normalizedPath, handler, pattern, paramNames),
      );
    } else {
      this.routes.push(new Route(method, normalizedPath, handler));
    }
  }

  // Math a route based on method and path
  match(
    method: string,
    path: string,
  ): [Route, null | Record<string, any>] | null {
    // First, try to match routes in this module
    const routeMatch = this.matchRoute(method, path);
    if (routeMatch) return routeMatch;

    // If no match, try to match in submodules
    for (const [_modulePath, module] of this.modules) {
      if (path.startsWith(module.prefix)) {
        const subPath = path.slice(module.prefix.length) || "/";
        const moduleMatch = module.match(method, subPath);
        if (moduleMatch) return moduleMatch;
      }
    }

    return null;
  }

  // Match a route based on method and path
  private matchRoute(
    method: string,
    path: string,
  ): [Route, null | Record<string, any>] | null {
    const normalizedPath = this.normalizePath(path);

    for (const route of this.routes) {
      if (route.method !== method) continue;

      if (route.pattern) {
        const match = normalizedPath.match(route.pattern);
        if (match) {
          const params = match.slice(1).reduce(
            (acc, value, index) => {
              acc[route.paramNames![index]] = value;
              return acc;
            },
            {} as Record<string, any>,
          );
          return [route, params];
        }
      } else if (route.path === normalizedPath) {
        return [route, null];
      }
    }

    return null;
  }

  //// HANDLE incoming HTTP-REQUESTs ////
  handle() {
    return (req: IncomingMessage, res: ServerResponse) => {
      const pathname = (req.url as string).split("?")[0] || "/";
      const queryTxt = (req.url as string).split("?")[1] || "";
      const query = parseQueryFromUrlText(queryTxt);
      const method = (req.method as HttpMethods) || "GET";

      const inquery = new Inquery(req);
      const reply = new Reply(res);

      const matched = this.match(method, pathname); // () => List :: 1. Route, 2. Params

      if (matched) {
        matched[0].handler({ inquery, reply, params: matched[1] || {}, query });
        return;
      }

      // Not found 404
      return reply.status(404).send("Route not found!");
    };
  }

  // add a module (sub-router) under a base path
  module(path: string, module: Gateway): void {
    module.prefix = this.prefix + this.normalizePath(path);
    this.modules.set(path, module);
  }

  // Convenience HTTP methods
  get(path: string, handler: ContextHandler) {
    this.register("GET", path, handler);
  }

  post(path: string, handler: ContextHandler) {
    this.register("POST", path, handler);
  }

  put(path: string, handler: ContextHandler) {
    this.register("PUT", path, handler);
  }

  delete(path: string, handler: ContextHandler) {
    this.register("DELETE", path, handler);
  }

  patch(path: string, handler: ContextHandler) {
    this.register("PATCH", path, handler);
  }

  head(path: string, handler: ContextHandler) {
    this.register("HEAD", path, handler);
  }

  options(path: string, handler: ContextHandler) {
    this.register("OPTIONS", path, handler);
  }

  trace(path: string, handler: ContextHandler) {
    this.register("TRACE", path, handler);
  }

  connect(path: string, handler: ContextHandler) {
    this.register("CONNECT", path, handler);
  }
}
