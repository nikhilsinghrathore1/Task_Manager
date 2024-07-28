"use server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import {eq , asc} from "drizzle-orm"


interface newTask {
               title:string;
               description?: string;
               dueDate?:

}

export const getTaskData = async () => {
               const user = await getCurrentUser();
               if (!user) {
                 throw new Error("User not authenticated");
               }
               const data = await db
                 .select()
                 .from(tasks)
                 .where(eq(tasks.userId, user.id))
                 .orderBy(asc(tasks.id));
               return data;
             };


export const addNewTask = async (task:) =>{
               const user = await getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated")
               }
               await db.insert(tasks).values({
                              ...task
               })
}
