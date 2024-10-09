/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 * @class Route
 */

import { HttpMethods } from "../constants";
import { ContextHandler } from "../types";

export class Route {
  method: HttpMethods;
  path: string;
  handler: ContextHandler;
  pattern?: RegExp;
  paramNames?: string[];

  constructor(
    method: HttpMethods,
    path: string,
    handler: ContextHandler,
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
