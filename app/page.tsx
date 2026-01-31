import { ActionToolbar } from "@/components/dashboard/action-toolbar";
import { FiltersCard } from "@/components/dashboard/filters-card";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RevenueByCategoryChart } from "@/components/dashboard/revenue-by-category";
import { SalesTrendChart } from "@/components/dashboard/sales-trend-chart";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <div className="space-y-4">
          <FiltersCard />
          <ActionToolbar />
          <KpiCards />
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SalesTrendChart />
            </div>
            <div className="lg:col-span-2">
              <RevenueByCategoryChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
