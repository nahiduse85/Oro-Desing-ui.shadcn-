"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, BarChart3 } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

function KpiCard({
  title,
  value,
  subtitle,
  subtitleColor = "text-muted-foreground",
  icon: Icon,
  iconBgColor,
  iconColor,
}: KpiCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <p className={`text-sm ${subtitleColor}`}>{subtitle}</p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCards() {
  const kpis: KpiCardProps[] = [
    {
      title: "Total Revenue",
      value: "$44.7M",
      subtitle: "+12.5% YoY",
      subtitleColor: "text-emerald-500",
      icon: DollarSign,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Sales",
      value: "$44.6M",
      subtitle: "Current period",
      icon: TrendingUp,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Customers",
      value: "202.6K",
      subtitle: "Active users",
      icon: Users,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Units Sold",
      value: "334.9K",
      subtitle: "Total units",
      icon: BarChart3,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
