import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { OrdersPage } from "@/components/dashboard/orders-page";

export default function Orders() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OrdersPage />
      </div>
    </div>
  );
}
