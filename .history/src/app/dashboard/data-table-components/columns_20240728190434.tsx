"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Expense } from "./schema";
import { TrendingUp, TrendingDown, FilePenLine, Trash } from "lucide-react";
import { Task } from "@/db/schema";
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons";
import { type } from "os";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { updateCompleted } from "@/actions/taskAction";
import { Button } from "@/components/ui/button";
import { Edit_task } from "@/components/Edit_task";
import { Delete_task } from "@/components/Delete_task";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("title")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {

      const rawDescription = row.getValue("description")

      const isDescription = typeof rawDescription === "string" && rawDescription.trim()

      return (
        <div className="flex space-x-2">
          <span
            className={cn("max-w-[400px] truncate font-medium capitalize", {
              "font-normal text-muted-foreground": !isDescription,
            })}
          >
            {/* {isDescription ? rawDescription : "-"} */}
            {isDescription ? rawDescription : "no description"}
          </span>
        </div>
      );
    },
  },
  
  {
    accessorKey: "completed",
    header: ({ column }) => (

      
      <DataTableColumnHeader column={column} title="Completed" />
      ),
      cell: ({ row }) => {
      const [completedLoading , setcompletedLoading] = useTransition()
     
        async function handleToggle (){
            setcompletedLoading(async()=>{
              try{
                const currentCompletedStatus = row.getValue("completed")
                await updateCompleted(row.original.id)

                if(currentCompletedStatus){
                  toast.success("task marked as not completed")
                }
                else{
                  
                  toast.success("task marked as completed")
                }
              }
              catch(err){
                console.log(err)
                toast.error("something went wrong")
              }
            })
        }


      return (
        <div className="flex w-[100px] items-center">
          <span>
        {completedLoading ? (

          <ReloadIcon className = "mr-2 size-4 animate-spin" aria-hidden="true"/>
          
          ):
          
          <Switch onCheckedChange={handleToggle} checked = {row.getValue("completed")} />
        }
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const duedate = new Date(row.getValue("dueDate"));

      let formattedDate = "Not set"
      let isValidDate = false

      if(duedate){
        const dateValue = new Date(row.getValue("dueDate"))
        isValidDate = !isNaN(dateValue.getTime());
        if(isValidDate){
          formattedDate = dateValue.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        } else{
          formattedDate ="Not set"
          };
        }
      
      
      return (
        <div className="flex w-[100px] items-center">
          <span
            className={cn({
              "font-normal text-muted-foreground": !isValidDate,
            })}
          >
            {formattedDate}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [showEdit, setshowEdit] = useState(false )
      const [showDelete, setshowDelete] = useState(false )
return (


  <div className="flex justify-center gap-2">

    <Edit_task task={row.original} open={showEdit} onOpenChange={setshowEdit}/>
     <Button
            size={"sm"}
            variant="outline"
            onClick={() => setshowEdit(true)}
          >
            <FilePenLine className="mr-2 size-4" />
            Edit
          </Button>


            <Delete_task
                        open={showDelete}
                        onOpenChange={setshowDelete}
                        showTrigger={"false"}/>
          <Button variant={"destructive"}
                  size={"sm"}
                  onClick={()=>setshowDelete(true)}
          >

            <Trash className ="mr-2 size-4"/>
            Delete


          </Button>
      </div>
        )
  }
    ,
  },
];