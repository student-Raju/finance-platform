import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import {clerkMiddleware,getAuth} from '@hono/clerk-auth';
import  accounts  from "./accounts";
import categories from "./categories";
import  transactions  from "./transactions";
import summary from "./summary";





export const runtime = 'nodejs';

const app = new Hono().basePath("/api")

app.use('*', clerkMiddleware());


const routes = app
  .route("/summary",summary)
  .route("/accounts", accounts)
  .route("/categories",categories)
  .route("/transactions",transactions);
  

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType= typeof routes;