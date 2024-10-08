class RouteNode {
  segment: string; // part of the path ("/abc", "/:id", etc.)
  methods: Map<string, string>; // map of HTTP methods ("GET", "POST") -> method identifier
  children: Map<string, RouteNode>; // child nodes (next segments of the path)
  wildcardChild: RouteNode | null; // child for wildcard matches

  constructor(segment: string) {
    this.segment = segment;
    this.methods = new Map();
    this.children = new Map();
    this.wildcardChild = null; // Initialize wildcard child as null
  }

  addMethod(method: string, handlerName: string) {
    this.methods.set(method, handlerName);
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

///// ---------------------------------------------------------------

class RouteTree {
  root: RouteNode;

  constructor() {
    this.root = new RouteNode("/");
  }

  addRoute(path: string, method: string, handlerName: string) {
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
    currentNode.addMethod(method, handlerName); // Add method to the final segment
  }

  // Add a module (sub-router) under a base path
  addModule(base: string, moduleRouter: RouteTree) {
    const segments = base.split("/").filter(Boolean); // Split and filter base path
    let currentNode = this.root;

    for (const segment of segments) {
      currentNode = currentNode.addChild(segment); // Navigate to the base path
    }

    // Merge moduleRouter routes into the current node
    moduleRouter.root.children.forEach((subChildNode, subSegment) => {
      currentNode.children.set(subSegment, subChildNode);
    });
  }

  findRoute(path: string, method: string): string | null {
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
}

//// ----------------------------------------------------------------

// Create the main router
const app = new RouteTree();

// Create a module (sub-router) for user-related routes
const userRouter = new RouteTree();
userRouter.addRoute("/users", "GET", "getUsers");
userRouter.addRoute("/users/:id", "GET", "getUserById");
userRouter.addRoute("/users", "POST", "createUser");
userRouter.addRoute("/users/:id", "PUT", "updateUser");
userRouter.addRoute("/users/:id", "DELETE", "deleteUser");

// Add the user router under the "/api/v1/*" path
app.addModule("/api/v1", userRouter);

////////////////////////////////////////////////////////////////////////

// Example usage:
// Example usage:
console.log(app.findRoute("/api/v1/users", "GET")); // "getUsers"
console.log(app.findRoute("/api/v1/users/123", "GET")); // "getUserById"
console.log(app.findRoute("/api/v1/users", "POST")); // "createUser"
console.log(app.findRoute("/api/v1/users/123", "PUT")); // "updateUser"
console.log(app.findRoute("/api/v1/users/123", "DELETE")); // "deleteUser"
