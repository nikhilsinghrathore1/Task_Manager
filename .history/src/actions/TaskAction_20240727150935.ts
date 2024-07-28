"use server";
import { db } from "@/db";
import { task } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import {eq , asc} from "drizzle-orm"

export const getTaskData =async () => {
               const user = getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated");
                              console.log("error occured")
               }

               const data = await db.select().from(task).where(eq(task.userId , user.id)).orderBy(asc(task.id))

               return data;

}
