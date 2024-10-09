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
  // register(method: HttpMethods, path: string, handler: ContextHandler): void {
  //   const normalizedPath = this.normalizePath(path);
  //   if (this.isParameterizedPath(normalizedPath)) {
  //     const { pattern, paramNames } = this.buildPattern(normalizedPath);
  //     this.routes.push(
  //       new Route(method, normalizedPath, handler, pattern, paramNames),
  //     );
  //   } else {
  //     this.routes.push(new Route(method, normalizedPath, handler));
  //   }
  // }

  // match(
  //   method: HttpMethods,
  //   path: string,
  // ): [Route, null | Record<string, any>] | null {
  //   const normalizedPath = this.normalizePath(path);

  //   for (const route of this.routes) {
  //     if (route.method !== method) continue;

  //     if (route.pattern) {
  //       const match = normalizedPath.match(route.pattern);
  //       if (match) {
  //         const params = match.slice(1).reduce(
  //           (acc, value, index) => {
  //             acc[route.paramNames![index]] = value;
  //             return acc;
  //           },
  //           {} as Record<string, any>,
  //         );

  //         return [route, params];
  //       }
  //     } else if (route.path === normalizedPath) {
  //       return [route, null];
  //     }
  //   }

  //   return null;
  // }

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

// import { IncomingMessage, ServerResponse } from "node:http";
// import { parseQueryFromUrlText } from "../helpers";
// import { ContextHandler } from "../types";
// import { Inquery } from "./inquary";
// import { Reply } from "./reply";
// import { RouteNode } from "./route";

// export class Gateway {
//   root: RouteNode;

//   constructor() {
//     this.root = new RouteNode("/"); // Initialize the root node
//   }

//   /// REGISTER a route <RouteNode> with a handler
//   // register(path: string, method: string, handler: ContextHandler) {
//   //   const segments = path.split("/").filter(Boolean); // Split by '/', ignore empty segments
//   //   let currentNode = this.root;

//   //   for (const segment of segments) {
//   //     if (segment === "*") {
//   //       // Handle wildcard routes
//   //       currentNode = currentNode.addWildcardChild();
//   //       break; // Wildcard matches everything after this point
//   //     }
//   //     currentNode = currentNode.addChild(segment);
//   //   }
//   //   currentNode.addMethod(method, handler); // Add method to the final segment
//   // }

//   register(path: string, method: string, handler: ContextHandler) {
//     const segments = path.split("/").filter(Boolean); // Split by '/', ignore empty segments
//     let currentNode = this.root;

//     for (const segment of segments) {
//       // Handle wildcard routes
//       if (segment === "*") {
//         currentNode = currentNode.addWildcardChild();
//         break; // Wildcard matches everything after this point
//       }

//       // Check if the segment is a dynamic parameter (e.g., :id)
//       if (segment.startsWith(":")) {
//         const paramNode = currentNode.addChild(segment);
//         currentNode = paramNode; // Move to this dynamic node
//       } else {
//         currentNode = currentNode.addChild(segment); // Add child for static segment
//       }
//     }

//     currentNode.addMethod(method, handler); // Add method to the final segment
//   }

//   // Add a module (sub-router) under a base path
//   module(base: string, moduleRouter: Gateway) {
//     const segments = base.split("/").filter(Boolean); // Split and filter base path
//     let currentNode = this.root;

//     for (const segment of segments) {
//       currentNode = currentNode.addChild(segment); // Navigate to the base path
//     }

//     // Recursively add all routes from moduleRouter under the base path
//     const addRoutesFromModule = (node: RouteNode, currentPath: string) => {
//       node.methods.forEach((handler, method) => {
//         this.register(currentPath, method, handler); // Register each method for the given path
//       });

//       node.children.forEach((childNode, segment) => {
//         const nextPath = `${currentPath}/${segment}`.replace(/\/+/g, "/"); // Avoid double slashes
//         addRoutesFromModule(childNode, nextPath); // Recursively register child routes
//       });

//       if (node.wildcardChild) {
//         const nextPath = `${currentPath}/*`;
//         addRoutesFromModule(node.wildcardChild, nextPath); // Handle wildcard route
//       }
//     };

//     addRoutesFromModule(moduleRouter.root, base);
//   }

//   // Traverse the route tree to find a matching route
//   // findRoute(path: string, method: string): ContextHandler | null {
//   //   const segments = path.split("/").filter(Boolean);
//   //   let currentNode = this.root;

//   //   for (const segment of segments) {
//   //     if (currentNode.children.has(segment)) {
//   //       currentNode = currentNode.children.get(segment)!;
//   //     } else if (currentNode.children.has(":id")) {
//   //       currentNode = currentNode.children.get(":id")!; // Handle dynamic segments
//   //     } else if (currentNode.wildcardChild) {
//   //       currentNode = currentNode.wildcardChild; // Handle wildcard
//   //       break; // Stop checking after wildcard match
//   //     } else {
//   //       return null; // No match found
//   //     }
//   //   }

//   //   return currentNode.methods.get(method) || null; // Return method handler
//   // }

//   findRoute(path: string, method: string): ContextHandler | null {
//     const segments = path.split("/").filter(Boolean); // Split and filter segments
//     const currentNode = this.root;
//     const params: Record<string, string> = {}; // Object to hold dynamic params

//     // Recursive function to traverse nodes
//     const traverse = (node: RouteNode, depth: number): RouteNode | null => {
//       if (depth === segments.length) {
//         return node.methods.has(method) ? node : null; // Found the method
//       }

//       const segment = segments[depth];

//       // Check for static segment match
//       if (node.children.has(segment)) {
//         const nextNode = node.children.get(segment)!;
//         return traverse(nextNode, depth + 1);
//       }

//       // Check for dynamic segment match (e.g., :id)
//       const dynamicKey = Array.from(node.children.keys()).find((key) =>
//         key.startsWith(":"),
//       );
//       if (dynamicKey) {
//         params[dynamicKey.slice(1)] = segment; // Capture the dynamic param
//         const dynamicNode = node.children.get(dynamicKey)!;
//         return traverse(dynamicNode, depth + 1);
//       }

//       // Check for wildcard match
//       if (node.wildcardChild) {
//         return traverse(node.wildcardChild, depth); // Match all remaining segments
//       }

//       return null; // No match found
//     };

//     const matchedNode = traverse(currentNode, 0);

//     if (matchedNode) {
//       return (ctx) => {
//         ctx.params = params; // Attach dynamic params to the context
//         matchedNode.methods.get(method)?.(ctx);
//       };
//     }

//     return null; // No route found
//   }

//   /// ================================================
//   // Handle incoming requests
//   handleRequests() {
//     return (req: IncomingMessage, res: ServerResponse) => {
//       // Find the matching route handler
//       const pathname = (req.url as string).split("?")[0] || "/";
//       const queryTxt = (req.url as string).split("?")[1] || "";
//       const query = parseQueryFromUrlText(queryTxt);
//       const params = {};
//       const method = (req.method as string) || "GET";

//       const inquery = new Inquery(req);
//       const reply = new Reply(res);

//       const handler = this.findRoute(pathname, method);

//       if (handler) {
//         handler({ inquery, reply, params, query });
//         return;
//       }

//       // Not found 404
//       return reply.status(404).send("Route not found!");
//     };
//   }
//   /// ================================================

//   /// HTTP specific methods
//   get(path: string, handler: ContextHandler) {
//     this.register(path, "GET", handler);
//   }

//   post(path: string, handler: ContextHandler) {
//     this.register(path, "POST", handler);
//   }

//   put(path: string, handler: ContextHandler) {
//     this.register(path, "PUT", handler);
//   }

//   delete(path: string, handler: ContextHandler) {
//     this.register(path, "DELETE", handler);
//   }

//   patch(path: string, handler: ContextHandler) {
//     this.register(path, "PATCH", handler);
//   }

//   head(path: string, handler: ContextHandler) {
//     this.register(path, "HEAD", handler);
//   }

//   options(path: string, handler: ContextHandler) {
//     this.register(path, "OPTIONS", handler);
//   }

//   trace(path: string, handler: ContextHandler) {
//     this.register(path, "TRACE", handler);
//   }

//   connect(path: string, handler: ContextHandler) {
//     this.register(path, "CONNECT", handler);
//   }
// }
