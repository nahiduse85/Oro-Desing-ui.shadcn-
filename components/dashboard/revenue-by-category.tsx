"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Electronics", value: 35, color: "#22d3ee" },
  { name: "Software", value: 25, color: "#22c55e" },
  { name: "Hardware", value: 20, color: "#f97316" },
  { name: "Services", value: 12, color: "#ef4444" },
  { name: "Other", value: 8, color: "#a855f7" },
];

export function RevenueByCategoryChart() {
  return (
    <Card className="border-border bg-card h-full">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-foreground">Revenue by Category</span>
          </div>
          <p className="text-xl font-semibold text-foreground">$44.7M</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[240px] w-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="ml-auto text-sm font-medium text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
