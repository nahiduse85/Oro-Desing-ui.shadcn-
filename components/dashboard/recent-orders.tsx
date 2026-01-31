"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const orders = [
  {
    id: "ORD-7892",
    customer: "Acme Corporation",
    product: "Enterprise License",
    amount: "$12,400",
    status: "Completed",
    date: "Jan 28, 2026",
  },
  {
    id: "ORD-7891",
    customer: "TechStart Inc",
    product: "Team Plan",
    amount: "$4,200",
    status: "Processing",
    date: "Jan 28, 2026",
  },
  {
    id: "ORD-7890",
    customer: "Global Systems",
    product: "Custom Integration",
    amount: "$28,500",
    status: "Completed",
    date: "Jan 27, 2026",
  },
  {
    id: "ORD-7889",
    customer: "DataFlow Ltd",
    product: "API Access",
    amount: "$1,850",
    status: "Pending",
    date: "Jan 27, 2026",
  },
  {
    id: "ORD-7888",
    customer: "CloudNine Solutions",
    product: "Enterprise License",
    amount: "$15,200",
    status: "Completed",
    date: "Jan 26, 2026",
  },
];

const statusStyles = {
  Completed: "bg-accent/20 text-accent border-accent/30",
  Processing: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  Pending: "bg-muted text-muted-foreground border-border",
};

export function RecentOrders() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-foreground">
          Recent Orders
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View all
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Product</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-border hover:bg-secondary/50"
              >
                <TableCell className="font-medium text-foreground">
                  {order.id}
                </TableCell>
                <TableCell className="text-foreground">{order.customer}</TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">
                  {order.product}
                </TableCell>
                <TableCell className="text-foreground">{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      statusStyles[order.status as keyof typeof statusStyles]
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
