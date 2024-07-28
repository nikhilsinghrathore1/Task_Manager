"use server";
import { db } from "@/db/index";
import { tasks } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq, asc , not , and} from "drizzle-orm";
import { revalidatePath } from "../../node_modules/next/cache";

interface NewTask {
  title: string;
  description?: string;
  dueDate?: Date | null;
  completed?: boolean;
}

interface EditCurrTask extends Partial<NewTask>{
  id:number
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

export const addTask = async (task: NewTask) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { dueDate, ...restTask } = task;

  await db.insert(tasks).values({
    ...restTask,
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: dueDate ? new Date(dueDate) : null, // Ensure dueDate is a Date object or null
  });
  revalidatePath("/")
};



export const updateCompleted = async(taskId : number )=>{
  const user = await getCurrentUser();
  if(!user){
    throw new Error(" user was not authenticated ")

  }
  await db.update(tasks).set({
    completed: not(tasks.completed)
  })
  .where(and(eq(tasks.userId ,user.id ) , eq(tasks.id , taskId))),
  revalidatePath("/")

}


export const editTask = async(task:EditCurrTask){
  const user = await getCurrentUser()
  if(!user){
    throw new Error ("user no authenticated")
  }

  const {id , ...updates} = task;

  await db.update(tasks).set({
    ...updates, 
    updateCompleted
  })

}