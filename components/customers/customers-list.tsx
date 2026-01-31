"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
  UserPlus,
  Users,
  Repeat,
} from "lucide-react";
import { AddCustomerModal } from "./add-customer-modal";

// Sample customer data
const customers = [
  {
    id: "CUS-001",
    name: "Ahmed Rahman",
    phone: "+8801712345678",
    district: "Dhaka",
    division: "Dhaka",
    totalOrders: 15,
    repeatOrders: 12,
    totalSpent: 45500,
    lastOrderDate: "Jan 28, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-002",
    name: "Fatima Begum",
    phone: "+8801823456789",
    district: "Chittagong",
    division: "Chittagong",
    totalOrders: 8,
    repeatOrders: 5,
    totalSpent: 22800,
    lastOrderDate: "Jan 25, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-003",
    name: "Mohammad Hasan",
    phone: "+8801934567890",
    district: "Sylhet",
    division: "Sylhet",
    totalOrders: 3,
    repeatOrders: 1,
    totalSpent: 8500,
    lastOrderDate: "Jan 20, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-004",
    name: "Nusrat Jahan",
    phone: "+8801645678901",
    district: "Rajshahi",
    division: "Rajshahi",
    totalOrders: 22,
    repeatOrders: 19,
    totalSpent: 67200,
    lastOrderDate: "Jan 30, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-005",
    name: "Kamal Uddin",
    phone: "+8801756789012",
    district: "Khulna",
    division: "Khulna",
    totalOrders: 1,
    repeatOrders: 0,
    totalSpent: 2500,
    lastOrderDate: "Jan 10, 2026",
    status: "inactive" as const,
  },
  {
    id: "CUS-006",
    name: "Rashida Akter",
    phone: "+8801867890123",
    district: "Barisal",
    division: "Barisal",
    totalOrders: 11,
    repeatOrders: 8,
    totalSpent: 34500,
    lastOrderDate: "Jan 27, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-007",
    name: "Jamal Khan",
    phone: "+8801978901234",
    district: "Rangpur",
    division: "Rangpur",
    totalOrders: 6,
    repeatOrders: 4,
    totalSpent: 18900,
    lastOrderDate: "Jan 22, 2026",
    status: "active" as const,
  },
  {
    id: "CUS-008",
    name: "Salma Khatun",
    phone: "+8801689012345",
    district: "Comilla",
    division: "Chittagong",
    totalOrders: 0,
    repeatOrders: 0,
    totalSpent: 0,
    lastOrderDate: "-",
    status: "inactive" as const,
  },
];

const kpiData = [
  {
    title: "Total Customers",
    value: "1,248",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Repeat Customers",
    value: "847",
    subtitle: "67.8%",
    icon: Repeat,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "New This Month",
    value: "156",
    icon: UserPlus,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Avg. Order Value",
    value: "৳2,450",
    icon: TrendingUp,
    color: "bg-amber-50 text-amber-600",
  },
];

interface CustomersListProps {
  onSelectCustomer: (customerId: string) => void;
}

export function CustomersList({ onSelectCustomer }: CustomersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage customers, orders, and repeat behavior
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Customer
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or phone..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all-divisions">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-divisions">All Divisions</SelectItem>
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="sylhet">Sylhet</SelectItem>
                <SelectItem value="rajshahi">Rajshahi</SelectItem>
                <SelectItem value="khulna">Khulna</SelectItem>
                <SelectItem value="barisal">Barisal</SelectItem>
                <SelectItem value="rangpur">Rangpur</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-districts">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-districts">All Districts</SelectItem>
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="comilla">Comilla</SelectItem>
                <SelectItem value="sylhet">Sylhet</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-types">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="repeat">Repeat</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {kpi.value}
                </p>
                {kpi.subtitle && (
                  <p className="mt-0.5 text-xs text-green-600">{kpi.subtitle}</p>
                )}
              </div>
              <div className={cn("rounded-xl p-3", kpi.color)}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customers Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">District</TableHead>
                <TableHead className="font-semibold text-center">Total Orders</TableHead>
                <TableHead className="font-semibold text-center">Repeat Orders</TableHead>
                <TableHead className="font-semibold text-right">Total Spent</TableHead>
                <TableHead className="font-semibold">Last Order</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => onSelectCustomer(customer.id)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.district}</TableCell>
                  <TableCell className="text-center font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="text-center">
                    {customer.repeatOrders > 0 ? (
                      <span className="font-medium text-green-600">{customer.repeatOrders}</span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ৳{customer.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.lastOrderDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.status === "active" ? "default" : "secondary"}
                      className={cn(
                        "capitalize",
                        customer.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCustomer(customer.id);
                      }}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing 1-8 of 1,248 customers
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                2
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                3
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      <AddCustomerModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}
