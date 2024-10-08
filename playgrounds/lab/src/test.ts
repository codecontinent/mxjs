import { match, MatchFunction } from "path-to-regexp";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Route {
  pattern: string;
  method: Method;
  handler: (params: any) => void;
  matcher: MatchFunction<Partial<Record<string, string | string[]>>>;
}

class Router {
  private routes: Route[] = [];

  public get(
    pattern: string,
    handler: (params: Record<string, string>) => void,
  ): void {
    const matcher = match(pattern);
    this.routes.push({ pattern, handler, matcher, method: "GET" });
  }

  public put(pattern: string, handler: (ctx: any) => void): void {
    const matcher = match(pattern);
    this.routes.push({ pattern, handler, matcher, method: "PUT" });
  }
  // ) {}

  public handleRequest(url: string, method: Method): void {
    for (const route of this.routes) {
      const result = route.matcher(url);
      if (result && route.method === method) {
        route.handler(result);
        return;
      }
    }
    console.log("No route matched.");
  }
}

// =======================================================================
// Create a new router instance
const router = new Router();

// Register a route
router.get("/user/:id", (params) => {
  console.log({
    path: `/user/${params.id}`,
    index: 0,
    params,
  });
});

router.put("/user/:id", ({ params }) => {
  console.log({
    path: `/user/${params.id}`,
    index: 0,
    params,
  });
});

// Simulate an incoming request
const incomingUrl = "/user/123";
router.handleRequest(incomingUrl, "PUT");

// Expected output:
// {
//   path: '/user/123',
//   index: 0,
//   params: { id: '123' }
// }
