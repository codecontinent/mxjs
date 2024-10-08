import { ContextHandler } from "../types";

export class RouteNode {
  segment: string; // part of the path ("/abc", "/:id", etc.)
  methods: Map<string, ContextHandler>; // map of HTTP methods ("GET", "POST") -> method identifier
  children: Map<string, RouteNode>; // child nodes (next segments of the path)
  wildcardChild: RouteNode | null; // child for wildcard matches

  constructor(segment: string) {
    this.segment = segment;
    this.methods = new Map();
    this.children = new Map();
    this.wildcardChild = null; // Initialize wildcard child as null
  }

  addMethod(method: string, handler: ContextHandler) {
    this.methods.set(method, handler);
  }

  addChild(segment: string): RouteNode {
    if (!this.children.has(segment)) {
      this.children.set(segment, new RouteNode(segment));
    }
    return this.children.get(segment)!;
  }

  addWildcardChild(): RouteNode {
    if (!this.wildcardChild) {
      this.wildcardChild = new RouteNode("*"); // Create a wildcard node
    }
    return this.wildcardChild;
  }
}
