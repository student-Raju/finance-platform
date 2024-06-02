import { Hono } from "hono";
import {db} from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { error } from "console";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";


const app=new Hono()
 .get(
   "/",
   clerkMiddleware(),
   async (c)=>{
      const auth =getAuth(c);
      if(!auth?.userId){
         return c.json({error:"Unauthorized"},401);
      }
      const data = await db
      .select({
         id:accounts.id,
         name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId,auth.userId));

      return c.json({data});

   } )

 .post(
   "/",
   clerkMiddleware(),
   zValidator("json",insertAccountSchema.pick({
      name: true,
   })),
   async (c)=>{
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if(!auth?.userId){
         return c.json({error:"Unauthorized"},401);
      }
      const data=await db.insert(accounts).values({
         id:"test",
         userId:auth.userId,
         ...values,
      })
    return c.json({});
 });
 export default app;
