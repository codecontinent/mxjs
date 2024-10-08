import { IncomingMessage, ServerResponse } from "node:http";
import { parseQueryFromUrlText } from "../helpers";
import { ContextHandler } from "../types";
import { Inquery } from "./inquary";
import { Reply } from "./reply";
import { RouteNode } from "./route";

export class Gateway {
  root: RouteNode;

  constructor() {
    this.root = new RouteNode("/"); // Initialize the root node
  }

  /// REGISTER a route <RouteNode> with a handler
  register(path: string, method: string, handler: ContextHandler) {
    const segments = path.split("/").filter(Boolean); // Split by '/', ignore empty segments
    let currentNode = this.root;

    for (const segment of segments) {
      if (segment === "*") {
        // Handle wildcard routes
        currentNode = currentNode.addWildcardChild();
        break; // Wildcard matches everything after this point
      }
      currentNode = currentNode.addChild(segment);
    }
    currentNode.addMethod(method, handler); // Add method to the final segment
  }

  // Add a module (sub-router) under a base path
  module(base: string, moduleRouter: Gateway) {
    const segments = base.split("/").filter(Boolean); // Split and filter base path
    let currentNode = this.root;

    for (const segment of segments) {
      currentNode = currentNode.addChild(segment); // Navigate to the base path
    }

    // Recursively add all routes from moduleRouter under the base path
    const addRoutesFromModule = (node: RouteNode, currentPath: string) => {
      node.methods.forEach((handler, method) => {
        this.register(currentPath, method, handler); // Register each method for the given path
      });

      node.children.forEach((childNode, segment) => {
        const nextPath = `${currentPath}/${segment}`.replace(/\/+/g, "/"); // Avoid double slashes
        addRoutesFromModule(childNode, nextPath); // Recursively register child routes
      });

      if (node.wildcardChild) {
        const nextPath = `${currentPath}/*`;
        addRoutesFromModule(node.wildcardChild, nextPath); // Handle wildcard route
      }
    };

    addRoutesFromModule(moduleRouter.root, base);
  }

  // Traverse the route tree to find a matching route
  findRoute(path: string, method: string): ContextHandler | null {
    const segments = path.split("/").filter(Boolean);
    let currentNode = this.root;

    for (const segment of segments) {
      if (currentNode.children.has(segment)) {
        currentNode = currentNode.children.get(segment)!;
      } else if (currentNode.children.has(":id")) {
        currentNode = currentNode.children.get(":id")!; // Handle dynamic segments
      } else if (currentNode.wildcardChild) {
        currentNode = currentNode.wildcardChild; // Handle wildcard
        break; // Stop checking after wildcard match
      } else {
        return null; // No match found
      }
    }

    return currentNode.methods.get(method) || null; // Return method handler
  }

  /// ================================================
  // Handle incoming requests
  handleRequests() {
    return (req: IncomingMessage, res: ServerResponse) => {
      // Find the matching route handler
      const pathname = (req.url as string).split("?")[0] || "/";
      const queryTxt = (req.url as string).split("?")[1] || "";
      const query = parseQueryFromUrlText(queryTxt);
      const params = {};
      const method = (req.method as string) || "GET";

      const inquery = new Inquery(req);
      const reply = new Reply(res);

      const handler = this.findRoute(pathname, method);

      if (handler) {
        handler({ inquery, reply, params, query });
        return;
      }

      // Not found 404
      return reply.status(404).send("Route not found!");
    };
  }
  /// ================================================

  /// HTTP specific methods
  get(path: string, handler: ContextHandler) {
    this.register(path, "GET", handler);
  }

  post(path: string, handler: ContextHandler) {
    this.register(path, "POST", handler);
  }

  put(path: string, handler: ContextHandler) {
    this.register(path, "PUT", handler);
  }

  delete(path: string, handler: ContextHandler) {
    this.register(path, "DELETE", handler);
  }

  patch(path: string, handler: ContextHandler) {
    this.register(path, "PATCH", handler);
  }

  head(path: string, handler: ContextHandler) {
    this.register(path, "HEAD", handler);
  }

  options(path: string, handler: ContextHandler) {
    this.register(path, "OPTIONS", handler);
  }

  trace(path: string, handler: ContextHandler) {
    this.register(path, "TRACE", handler);
  }

  connect(path: string, handler: ContextHandler) {
    this.register(path, "CONNECT", handler);
  }
}
