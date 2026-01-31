"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  Edit2,
  ExternalLink,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plus,
  Receipt,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
  Star,
  User,
  XCircle,
} from "lucide-react";

// Sample customer data
const customerData = {
  id: "CUS-001",
  name: "Ahmed Rahman",
  phone: "+8801712345678",
  email: "ahmed.rahman@email.com",
  address: "House 12, Road 5, Block C, Banani",
  district: "Dhaka",
  division: "Dhaka",
  notes: "VIP customer, prefers morning delivery",
  lifetimeValue: 45500,
  totalOrders: 15,
  repeatOrders: 12,
  lastOrderAmount: 3200,
  avgOrderValue: 3033,
  orderFrequency: "2.5/month",
  returnRate: "6.7%",
  cancelRate: "0%",
  tags: ["Repeat", "VIP"],
};

const orders = [
  { id: "ORD-1021", date: "Jan 28, 2026", total: 3200, status: "Delivered" },
  { id: "ORD-1018", date: "Jan 22, 2026", total: 2800, status: "Delivered" },
  { id: "ORD-1015", date: "Jan 15, 2026", total: 4500, status: "Delivered" },
  { id: "ORD-1010", date: "Jan 08, 2026", total: 2100, status: "Cancelled" },
  { id: "ORD-1005", date: "Jan 02, 2026", total: 3800, status: "Delivered" },
];

const payments = [
  { date: "Jan 28, 2026", amount: 3200, method: "bKash", reference: "TXN892834" },
  { date: "Jan 22, 2026", amount: 2800, method: "Card", reference: "PAY728394" },
  { date: "Jan 15, 2026", amount: 4500, method: "COD", reference: "-" },
  { date: "Jan 02, 2026", amount: 3800, method: "bKash", reference: "TXN782931" },
];

const returns = [
  { orderId: "ORD-1008", reason: "Wrong size", amount: 1200 },
];

const addresses = [
  { id: 1, label: "Home (Default)", address: "House 12, Road 5, Block C, Banani, Dhaka 1213", isDefault: true },
  { id: 2, label: "Office", address: "Floor 8, Tower B, Gulshan Avenue, Dhaka 1212", isDefault: false },
];

const activities = [
  { date: "Jan 28, 2026 10:30 AM", action: "Order delivered", details: "ORD-1021 delivered successfully" },
  { date: "Jan 26, 2026 02:15 PM", action: "Payment received", details: "৳3,200 via bKash" },
  { date: "Jan 25, 2026 09:00 AM", action: "Order placed", details: "ORD-1021 created" },
  { date: "Jan 22, 2026 11:45 AM", action: "Order delivered", details: "ORD-1018 delivered successfully" },
  { date: "Jan 20, 2026 03:30 PM", action: "Note added", details: "Marked as VIP customer" },
];

interface CustomerDetailsProps {
  customerId: string;
  onBack: () => void;
}

export function CustomerDetails({ customerId, onBack }: CustomerDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 -mx-6 -mt-6 bg-background px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Customers
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">{customerData.name}</h1>
              <div className="flex gap-2">
                {customerData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={cn(
                      tag === "VIP"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Profile Card & KPIs */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Profile Card */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Customer Profile</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{customerData.name}</p>
                <p className="text-sm text-muted-foreground">{customerData.id}</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customerData.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p>{customerData.address}</p>
                  <p className="text-muted-foreground">{customerData.district}, {customerData.division}</p>
                </div>
              </div>
              {customerData.notes && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{customerData.notes}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* KPI Summary */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Customer Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs font-medium">Lifetime Value</span>
                </div>
                <p className="mt-2 text-xl font-bold text-blue-700">৳{customerData.lifetimeValue.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-600">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-medium">Total Orders</span>
                </div>
                <p className="mt-2 text-xl font-bold text-green-700">{customerData.totalOrders}</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-xs font-medium">Repeat Orders</span>
                </div>
                <p className="mt-2 text-xl font-bold text-purple-700">{customerData.repeatOrders}</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Receipt className="h-4 w-4" />
                  <span className="text-xs font-medium">Last Order</span>
                </div>
                <p className="mt-2 text-xl font-bold text-amber-700">৳{customerData.lastOrderAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Behavior Summary */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Behavior Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="mt-1 text-lg font-semibold">৳{customerData.avgOrderValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Frequency</p>
              <p className="mt-1 text-lg font-semibold">{customerData.orderFrequency}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Return Rate</p>
              <p className="mt-1 text-lg font-semibold">{customerData.returnRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cancel Rate</p>
              <p className="mt-1 text-lg font-semibold text-green-600">{customerData.cancelRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="returns"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Returns
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Addresses
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Activity & Notes
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-semibold">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">৳{order.total.toLocaleString()}</p>
                          <Badge
                            variant="secondary"
                            className={cn(
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 font-semibold">Quick Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                      <Star className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-700">High Repeat Rate</p>
                        <p className="text-sm text-green-600">80% of orders are repeat purchases</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-700">Active Customer</p>
                        <p className="text-sm text-blue-600">Last order 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-4">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-amber-700">Outstanding Due</p>
                        <p className="text-sm text-amber-600">৳0 - All payments cleared</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Order ID</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Total</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-primary">{order.id}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="text-right font-medium">৳{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="gap-1 text-primary">
                          <ExternalLink className="h-3 w-3" />
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Amount</TableHead>
                    <TableHead className="font-semibold">Method</TableHead>
                    <TableHead className="font-semibold">Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">৳{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.method}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{payment.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Returns Tab */}
            <TabsContent value="returns" className="p-0">
              {returns.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-semibold">Order ID</TableHead>
                      <TableHead className="font-semibold">Reason</TableHead>
                      <TableHead className="font-semibold text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returns.map((ret, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-primary">{ret.orderId}</TableCell>
                        <TableCell className="text-muted-foreground">{ret.reason}</TableCell>
                        <TableCell className="text-right font-medium text-red-600">৳{ret.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <RotateCcw className="h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-3 font-medium text-muted-foreground">No returns</p>
                  <p className="text-sm text-muted-foreground">This customer has no return history</p>
                </div>
              )}
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Saved Addresses</h3>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Add Address
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "rounded-lg border p-4",
                      addr.isDefault && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{addr.label}</p>
                          {addr.isDefault && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{addr.address}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Activity & Notes Tab */}
            <TabsContent value="activity" className="p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-semibold">Activity Timeline</h3>
                  <div className="relative space-y-4 pl-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
                    {activities.map((activity, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 font-semibold">Internal Notes</h3>
                  <Textarea
                    placeholder="Add a note about this customer..."
                    className="min-h-[120px]"
                    defaultValue={customerData.notes}
                  />
                  <Button className="mt-3" size="sm">
                    Save Note
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
