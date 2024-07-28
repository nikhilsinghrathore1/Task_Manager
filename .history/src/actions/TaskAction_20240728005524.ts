"use server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import {eq , asc} from "drizzle-orm"


interface newTask {
               title:string;
               description?: string;
               dueDate?:Date|null;
               completed?:boolean
}

export const addTask = async (task: newTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.insert(tasks).values({
    ...task,
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};


export const addNewTask = async (task:newTask) =>{
               const user = await getCurrentUser()
               if(!user){
                              throw new Error("user not authenticated")
               }
               await db.insert(task).values({
                ...task,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
}
