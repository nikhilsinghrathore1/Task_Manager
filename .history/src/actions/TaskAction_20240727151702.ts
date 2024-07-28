"use server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import {eq , asc} from "drizzle-orm"

export const getTaskData = async () => {
               const user = getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated");
                              console.log("error occured")
               }

               const data = await db.select().from(tasks).where(eq(tasks.userId , user.id)).orderBy(asc(tasks.id))

               return data;

}
