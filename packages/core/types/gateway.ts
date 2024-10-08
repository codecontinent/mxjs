import type { HttpMethods } from "../lib";
import type { ContextHandler } from "./context";

export interface Route {
  method: HttpMethods; // HTTP method (GET, POST, etc.)

  path: string; // Original path as defined by the user

  handler: ContextHandler; // Function to handle requests

  query: Record<string, any>; // Query parameters parsed from the URL

  params: Record<string, any>; // Params populated by the matched route

  openapi?: Record<string, any>; // OpenAPI schema for @mx/openapi (Upcoming feature)
}
