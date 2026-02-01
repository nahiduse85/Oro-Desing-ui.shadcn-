"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  CheckSquare,
  DollarSign,
  Globe,
  LayoutGrid,
  Package,
  Receipt,
  Settings,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsModal } from "@/components/settings/settings-modal";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutGrid, label: "Dashboard", href: "/" },
  { icon: Receipt, label: "Orders", href: "/orders" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Zap, label: "Automation", href: "/automation" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Truck, label: "Suppliers", href: "/suppliers" },
  { icon: DollarSign, label: "Finance", href: "/finance" },
  { icon: Globe, label: "Marketplace", href: "/marketplace" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <aside className="flex h-screen w-56 flex-col border-r border-sidebar-border bg-sidebar">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Box className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-foreground">
            Nexus ERP
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="border-t border-border px-3 py-3">
          <button
            onClick={() => setSettingsOpen(true)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Settings
          </button>
        </div>
      </aside>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
