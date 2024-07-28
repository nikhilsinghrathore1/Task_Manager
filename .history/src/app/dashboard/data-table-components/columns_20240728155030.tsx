"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Expense } from "./schema";
import { Task } from "@/db/schema";
import { toast } from "sonner"

import { type } from "os";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { updateCompleted } from "@/actions/taskAction";

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
                
              }

            })
        }


      return (
        <div className="flex w-[100px] items-center">
          <span>
          <Switch checked = {row.getValue("completed")} />
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];