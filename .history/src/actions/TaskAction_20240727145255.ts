"use server";
import { db } from "@/db/index";
import { getCurrentUser } from "@/lib/session";


const getTaskData =async () => {
               const user = getCurrentUser()
               if(!user){
                              throw new error
               }
}