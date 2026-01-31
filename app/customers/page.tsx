"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CustomersList } from "@/components/customers/customers-list";
import { CustomerDetails } from "@/components/customers/customer-details";

type View = "list" | "details";

export default function CustomersPage() {
  const [view, setView] = useState<View>("list");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setView("details");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedCustomerId(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {view === "list" && (
            <CustomersList onSelectCustomer={handleSelectCustomer} />
          )}
          {view === "details" && selectedCustomerId && (
            <CustomerDetails
              customerId={selectedCustomerId}
              onBack={handleBackToList}
            />
          )}
        </div>
      </main>
    </div>
  );
}
