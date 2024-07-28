import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table-components/data-table";
import path from "path";
import fs from "fs";
import { columns } from "./data-table-components/columns";
import { getTaskData } from "@/actions/taskAction";




export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const data = await getTaskData();



  return (
    <div>
      <h1>Dashboard</h1>
      <p>put your dashboardy stuff here</p>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
