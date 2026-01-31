"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 48000, expenses: 31000 },
  { month: "Mar", revenue: 55000, expenses: 34000 },
  { month: "Apr", revenue: 51000, expenses: 32000 },
  { month: "May", revenue: 62000, expenses: 38000 },
  { month: "Jun", revenue: 71000, expenses: 42000 },
  { month: "Jul", revenue: 68000, expenses: 40000 },
  { month: "Aug", revenue: 79000, expenses: 45000 },
  { month: "Sep", revenue: 84000, expenses: 48000 },
  { month: "Oct", revenue: 92000, expenses: 52000 },
  { month: "Nov", revenue: 98000, expenses: 55000 },
  { month: "Dec", revenue: 105000, expenses: 58000 },
];

export function RevenueChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium text-foreground">
            Revenue Overview
          </CardTitle>
          <div className="mt-1 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-1" />
              <span className="text-xs text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-2" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
          </div>
        </div>
        <Select defaultValue="12m">
          <SelectTrigger className="w-32 bg-secondary text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.15 180)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.7 0.15 180)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.15 85)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.75 0.15 85)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.145 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.7 0.15 180)"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="oklch(0.75 0.15 85)"
                strokeWidth={2}
                fill="url(#expensesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
