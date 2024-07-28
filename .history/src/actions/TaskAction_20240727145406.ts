"use server";
import { db } from "@/db/index";
import { task } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";


const getTaskData =async () => {
               const user = getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated");
               }

               const data = await db.select().from(task).where(eq)

}
