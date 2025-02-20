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
                                                            <span className="hidden sm:flex ">Delete</span>{}
                                             </Button>

                              </DialogTrigger>
               )}
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
