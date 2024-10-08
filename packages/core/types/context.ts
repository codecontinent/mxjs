import { Inquery, Reply } from "../lib";

export interface Context {
  inquery: Inquery; // Incoming request
  reply: Reply; // Outgoing response

  params: Record<string, any>;
  query: Record<string, any>;

  pass?: () => void | Promise<void>;
  guards?: Guards[]; // Acts as middleware[]
}

export interface Guards {
  inquary: Inquery;
  reply: Reply;
  pass: () => void | Promise<void>;
}

export type ContextHandler = (ctx: Context) => void | Promise<void>;
