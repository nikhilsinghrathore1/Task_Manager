"use server";
import { db } from "@/db/index";
import { task } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import {eq} from "drizzle-orm"

const getTaskData =async () => {
               const user = getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated");
               }

               const data = await db.select().from(task).where(eq(task))

}
