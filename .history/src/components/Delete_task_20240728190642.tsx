"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrashIcon } from "lucide-react";
import { Task } from "@/db/schema"
import { Row } from "@tanstack/react-table";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { deleteTask } from "@/actions/taskAction"
import { toast } from "sonner";


interface deleteTask extends React.ComponentPropsWithoutRef<typeof Dialog>{
               task:Row<Task>["original"][]
               showTrigger?: boolean
               onSuccess?:()=>void
}




export function Delete_task({
               task,
               showTrigger = true,
               onSuccess , 
               ...props

}:deleteTask) {

               const [isDeletePending , setDeletePending] = useTransition()

               const handleDeleteTask =async ()=>{
                              setDeletePending(async()=>{
                                             try{
                                                            await deleteTask(task.map((t)=>t.id))
                                                            toast.success("task deleted succesfully")
                                                            props.onOpenChange?.(false)
                                                            onSuccess?.()
                                             }
                                             catch(err){
                                                            console.log(err)
                                                            toast.error("task was not delted something went wrong")

                                             }
                              })
               }


  return (
    <Dialog>
               {showTrigger? (
                              <DialogTrigger as child>

                                             <Button variant="outline" size={"sm"}>
                                                            <TrashIcon className = "mr-2 size-4" aria-hidden="true"/>
                                                            <span className="hidden sm:flex ">Delete</span>({task.length})
                                             </Button>

                              </DialogTrigger>
               ):null}
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            this action cannot be undone . this will permanently delete your {" "}
            <span className="font-medium">{task.length}</span>
            {task.length === 1 ?"task":"tasks"} from our server
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
               <DialogClose as child>
                              <Button type="button" variant="secondary">
                                             cancel
                              </Button>
               </DialogClose>

                              <Button variant={"destructive"}
                                      onClick={handleDeleteTask}
                                      disabled={isDeletePending}>
                                             {
                                                            isDeletePending && (
                                                                           <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true"/>
                                                            )
                                             }
                                             Delete

                              </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
