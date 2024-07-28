"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

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



import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { toast } from "sonner"


import { addTask, editTask } from "@/actions/taskAction";
import { Task } from "@/db/schema";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(9999).optional(),
  dueDate: z.string().optional(),

  completed: z.boolean().optional()
});

interface editTaskDialog extends React.ComponentPropsWithoutRef<typeof Dialog>{
task:Task
}


export function Edit_task({task , ...props}:editTaskDialog) {

  const [open, setopen] = useState(false)
  const [updatePending, setUpdatePending] = useTransition()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      title: task.title ?? "",
      description: task.description ?? "",
      completed: task.completed,
      dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {

    setUpdatePending(async ()=>{

      const { dueDate, ...restValues } = values;
    
      try {
        await editTask({
               id:task.id, 
               title:values.title,
               description:values.description,
               completed:values.completed,
               dueDate: values.dueDate ? new Date(dueDate) : null,
        });
        setopen(false)
        form.reset();
        toast.success("task created succesfully ")
      } catch (err) {
        toast.error("task not created ")
        console.log(err);
      }
    
      console.log(values);
    })

  
  }
  return (


  <Dialog {...props}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new tasks</DialogTitle>
      <DialogDescription>
       Fill in the details below to add new task. 
      </DialogDescription>
    </DialogHeader>


    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title </FormLabel>
              <FormControl>
                <Input placeholder="Task Name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>due Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">completed</FormLabel>
                
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

            <DialogFooter>
            <DialogClose as child>

            <Button onClick={()=>setopen(false)} type="button" variant="secondary">
              close
            </Button>

            </DialogClose>
        <Button type="submit">
          {updatePending && (
            <ReloadIcon className = "mr-2 size-4 animate-spin" aria-hidden="true" />
          )}
          Submit</Button>
            </DialogFooter>
      </form>
    </Form>


  </DialogContent>
</Dialog>




   
  );
}
