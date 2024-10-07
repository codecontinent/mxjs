import { Inquery, Reply } from "../lib";

/* eslint-disable no-unused-vars */

export interface Context {
  inquary: Inquery;
  reply: Reply;
  guards?: any[];
}

export interface Guards {
  inquary: Inquery;
  reply: Reply;
  pass: () => void | Promise<void>;
}

export type ContextHandler = (ctx: Context) => void | Promise<void>;
