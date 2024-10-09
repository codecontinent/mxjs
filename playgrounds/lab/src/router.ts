/* eslint-disable @typescript-eslint/no-unsafe-function-type */
class Route {
  method: string;
  path: string;
  handler: Function;
  pattern?: RegExp;
  paramNames?: string[];

  constructor(
    method: string,
    path: string,
    handler: Function,
    pattern?: RegExp,
    paramNames?: string[],
  ) {
    this.method = method;
    this.path = path;
    this.handler = handler;
    this.pattern = pattern;
    this.paramNames = paramNames;
  }
}

class Gateway {
  private routes: Route[] = [];

  addRoute(method: string, path: string, handler: Function): void {
    const normalizedPath = this.normalizePath(path);
    if (this.isParameterizedPath(normalizedPath)) {
      const { pattern, paramNames } = this.buildPattern(normalizedPath);
      this.routes.push(
        new Route(method, normalizedPath, handler, pattern, paramNames),
      );
    } else {
      this.routes.push(new Route(method, normalizedPath, handler));
    }
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

  match(method: string, path: string): Function | null {
    const normalizedPath = this.normalizePath(path);

    for (const route of this.routes) {
      if (route.method !== method) continue;

      if (route.pattern) {
        const match = normalizedPath.match(route.pattern);
        if (match) {
          const params = match.slice(1);
          return () => route.handler(...params);
        }
      } else if (route.path === normalizedPath) {
        return route.handler;
      }
    }

    return null;
  }
}

/// Example usage and testing
const gateway = new Gateway();

gateway.addRoute("GET", "/", () => "Root Route");
gateway.addRoute("GET", "/users", () => "Users List");
gateway.addRoute("GET", "/users/:id", (id: string) => `User ${id}`);
gateway.addRoute("POST", "/users", () => "Create User");
gateway.addRoute("GET", "/files/*", (path: string) => `File: ${path}`);
gateway.addRoute("GET", "/abc/:id/xyz/:action/mno/:prop", () => "Multi Params");
gateway.addRoute(
  "GET",
  "/abc/:id/xyz/:action/mno/:prop/a/:a/b/:b/c/:c/d/:d/e/:e/f/:f/g/:g/h/:h/i/:i/j/:j/k/:k/l/:l/m/:m/n/:n/o/:o/p/:p/q/:q/r/:r/s/:s/t/:t/u/:u/v/:v/w/:w/x/:x/y/:y/z/:z",
  () => "Multi Params Extreme",
);

function caughtOr404(handler: Function | null) {
  if (handler) return handler();
  return "404 Not Found";
}

/// Writing Node.js (v20) built-in test cases
import assert from "assert";

// Test cases
try {
  assert.strictEqual(caughtOr404(gateway.match("GET", "/")), "Root Route");
  assert.strictEqual(caughtOr404(gateway.match("GET", "/users")), "Users List");
  assert.strictEqual(
    caughtOr404(gateway.match("GET", "/users/")),
    "Users List",
  );
  assert.strictEqual(
    caughtOr404(gateway.match("GET", "/users/123")),
    "User 123",
  );
  assert.strictEqual(
    caughtOr404(gateway.match("POST", "/users")),
    "Create User",
  );
  assert.strictEqual(
    caughtOr404(gateway.match("GET", "/files/image.png")),
    "File: image.png",
  );
  assert.strictEqual(
    caughtOr404(gateway.match("GET", "/nonexistent")),
    "404 Not Found",
  );

  assert.strictEqual(
    caughtOr404(gateway.match("GET", "/abc/123/xyz/edit/mno/prop")),
    "Multi Params",
  );

  assert.strictEqual(
    caughtOr404(
      gateway.match(
        "GET",
        "/abc/1/xyz/2/mno/3/a/4/b/5/c/6/d/7/e/8/f/9/g/10/h/11/i/12/j/13/k/14/l/15/m/16/n/17/o/18/p/19/q/20/r/21/s/22/t/23/u/24/v/25/w/26/x/27/y/28/z/29",
      ),
    ),
    "Multi Params Extreme",
  );

  // expecting 404: too many params - extreme case
  assert.strictEqual(
    caughtOr404(
      gateway.match(
        "GET",
        "/abc/1/xyz/2/mno/3/a/4/b/5/c/6/d/7/e/8/f/9/g/10/h/11/i/12/j/13/k/14/l/15/m/16/n/17/o/18/p/19/q/20/r/21/s/22/t/23/u/24/v/25/w/26/xx/27/y/28/z/29",
      ),
    ),
    "404 Not Found",
  );

  console.log("✅: All tests passed!");
} catch (error) {
  console.error("❌: Test failed:", (error as any).message);
}
