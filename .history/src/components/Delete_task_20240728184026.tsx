import { Button } from "@/components/ui/button"
import {
  Dialog,
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
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
