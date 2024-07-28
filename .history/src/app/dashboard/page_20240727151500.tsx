import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table-components/data-table";
import path from "path";
import fs from "fs";
import { columns } from "./data-table-components/columns";
import { getTaskData } from "@/actions/taskAction";

const data2 = [
  // your data entries here...
];

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/dashboard/data-table-components",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Validate data function
function validateData(data) {
  return data.map(item => {
    return {
      label: String(item.label),
      note: String(item.note),
      category: String(item.category),
      type: String(item.type),
      amount: Number(item.amount),
      date: String(item.date)
    };
  });
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const data = validateData(await getData());
  // const mainData = validateData(await getTaskData());

  console.log(mainData);
  if (!user) redirect("/sign-in");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>put your dashboardy stuff here</p>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
