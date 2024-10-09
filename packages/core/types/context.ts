/**
 * @module @mx/core
 * (c) 2024, Mahabub
 * @version 0.1.0 (alpha)
 */

import { Inquery, Reply } from "../lib";

/**
 * Context object
 * @typedef {Object} Context
 * @property {Inquery} inquery - Incoming request
 * @property {Reply} reply - Outgoing response
 * @property {Record<string, any>} params - URL parameters
 * @property {Record<string, any>} query - URL query
 * @property {Function} pass - Pass control to the next handler
 * @property {Guards[]} guards - Acts as middleware[]
 */
export interface Context {
  inquery: Inquery; // Incoming request
  reply: Reply; // Outgoing response

  params: Record<string, any>;
  query: Record<string, any>;

  pass?: () => void | Promise<void>;
  guards?: Guards[]; // Acts as middleware[]
}

/**
 * Guards object
 * @typedef {Object} Guards
 * @property {Inquery} inquary - Incoming request
 * @property {Reply} reply - Outgoing response
 * @property {Function} pass - Pass control to the next handler
 * @property {Function} guards - Acts as middleware[]
 */
export interface Guards {
  inquary: Inquery;
  reply: Reply;
  pass: () => void | Promise<void>;
}

/**
 * Context handler
 * @typedef {Function} ContextHandler
 * @param {Context} ctx - Context object
 * @returns {void | Promise<void>}
 * @example
 * const handler: ContextHandler = (ctx) => {
 *  ctx.reply.send("Hello World");
 * }
 * @example
 * class Controller {
 *  // get handler
 *  public index({ reply }: ContextHandler): void {
 *   return reply.send("Hello World");
 *  }
 * }
 */
export type ContextHandler = (ctx: Context) => void | Promise<void>;
