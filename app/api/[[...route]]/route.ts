import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { handle } from 'hono/vercel';




export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.get("/hello",(c)=>{
  return c.json({hello:"world"})
})

export const GET = handle(app);
export const POST = handle(app);