"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 1500000 },
  { month: "Feb", sales: 1600000 },
  { month: "Mar", sales: 1850000 },
  { month: "Apr", sales: 1700000 },
  { month: "May", sales: 2100000 },
  { month: "Jun", sales: 2050000 },
  { month: "Jul", sales: 1950000 },
  { month: "Aug", sales: 2200000 },
  { month: "Sep", sales: 2350000 },
  { month: "Oct", sales: 2100000 },
  { month: "Nov", sales: 2450000 },
  { month: "Dec", sales: 2600000 },
];

export function SalesTrendChart() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Sales Trend</span>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-foreground">$22.1M</p>
            <p className="text-sm text-emerald-500">+69.4%</p>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}K`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  "Sales",
                ]}
                labelStyle={{ color: "#374151", fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={{ fill: "#22d3ee", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#22d3ee" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
