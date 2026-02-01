import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { TasksPage } from "@/components/tasks/tasks-page";

export default function Tasks() {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-hidden">
        <TasksPage />
      </main>
    </div>
  );
}
