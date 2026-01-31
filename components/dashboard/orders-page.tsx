"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit,
  ExternalLink,
  Filter,
  Info,
  MoreHorizontal,
  Phone,
  Plus,
  Printer,
  QrCode,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

type OrderStatus =
  | "Pending"
  | "On Hold"
  | "Approved"
  | "Processing"
  | "Ready To Ship"
  | "In Transit"
  | "Delivered"
  | "Flagged"
  | "Cancelled";

interface Order {
  id: string;
  invoiceNo: string;
  source: "Website" | "WooCommerce";
  createdAt: string;
  shippingDate: string;
  statusDate?: string;
  statusType?: string;
  followUpDate?: string;
  autoApproveDate?: string;
  customer: {
    name: string;
    isNew: boolean;
    phone: string;
    address: string;
  };
  pickupAddress: string;
  payments: {
    salesAmount: number;
    paidAmount: number;
    dueAmount: number;
  };
  orderStatus: OrderStatus;
  deliveryPartner?: {
    name: string;
    status?: string;
    trackingId?: string;
  };
  deliveryFee: number;
  deliveryType: "Regular" | "Express";
  cancelReason?: string;
  internalNotes?: string;
}

const statusTabs: { label: string; status: OrderStatus | "All"; count: number }[] = [
  { label: "All Orders", status: "All", count: 5 },
  { label: "Pending", status: "Pending", count: 1 },
  { label: "On Hold", status: "On Hold", count: 1 },
  { label: "Approved", status: "Approved", count: 1 },
  { label: "Processing", status: "Processing", count: 0 },
  { label: "Ready To Ship", status: "Ready To Ship", count: 0 },
  { label: "In-Transit", status: "In Transit", count: 1 },
  { label: "Delivered", status: "Delivered", count: 0 },
  { label: "Flagged", status: "Flagged", count: 0 },
  { label: "Cancelled", status: "Cancelled", count: 1 },
];

const mockOrders: Order[] = [
  {
    id: "1",
    invoiceNo: "FX-0005",
    source: "Website",
    createdAt: "Jan 24, 2026 04:02 PM",
    shippingDate: "Jan 24, 2026 04:02 PM",
    statusDate: "Jan 24, 2026 04:02 PM",
    statusType: "Cancelled",
    customer: {
      name: "NAHIDUL",
      isNew: true,
      phone: "+8801328190017",
      address: "DHAKA DHANMONDI, NEW 8/A DHAKA, BANGLADESH",
    },
    pickupAddress: "Warehouse",
    payments: {
      salesAmount: 500.0,
      paidAmount: 0.0,
      dueAmount: 580.0,
    },
    orderStatus: "Cancelled",
    deliveryPartner: {
      name: "Steadfast",
    },
    deliveryFee: 80.0,
    deliveryType: "Regular",
    cancelReason: "Fake Order",
  },
  {
    id: "2",
    invoiceNo: "FX-0004",
    source: "Website",
    createdAt: "Jan 24, 2026 10:21 AM",
    shippingDate: "Jan 24, 2026 10:38 AM",
    statusDate: "Jan 24, 2026 10:38 AM",
    statusType: "In-Transit",
    customer: {
      name: "JABED",
      isNew: true,
      phone: "+8801328190016",
      address: "DHAKA DHANMONDI, NEW 8/A DHAKA, BANGLADESH",
    },
    pickupAddress: "Warehouse",
    payments: {
      salesAmount: 500.0,
      paidAmount: 0.0,
      dueAmount: 580.0,
    },
    orderStatus: "In Transit",
    deliveryPartner: {
      name: "Steadfast",
      status: "In Review",
      trackingId: "211897799",
    },
    deliveryFee: 80.0,
    deliveryType: "Regular",
  },
  {
    id: "3",
    invoiceNo: "FX-0003",
    source: "WooCommerce",
    createdAt: "Jan 16, 2026 09:36 PM",
    shippingDate: "Jan 16, 2026 09:35 PM",
    customer: {
      name: "JABED",
      isNew: true,
      phone: "+8801328190016",
      address: "DHAKA DHANMONDI, NEW 8/A DHAKA, BANGLADESH",
    },
    pickupAddress: "Warehouse",
    payments: {
      salesAmount: 500.0,
      paidAmount: 0.0,
      dueAmount: 500.0,
    },
    orderStatus: "Pending",
    deliveryFee: 0,
    deliveryType: "Regular",
  },
  {
    id: "4",
    invoiceNo: "FX-0002",
    source: "WooCommerce",
    createdAt: "Jan 15, 2026 04:41 PM",
    shippingDate: "Jan 15, 2026 04:43 PM",
    statusDate: "Jan 24, 2026 10:20 AM",
    statusType: "On Hold",
    followUpDate: "Jan 24, 2026 10:23 AM",
    customer: {
      name: "NAHIDUL",
      isNew: true,
      phone: "+8801328190017",
      address: "DHAKA DHANMONDI, NEW 8/A DHAKA, BANGLADESH",
    },
    pickupAddress: "Warehouse",
    payments: {
      salesAmount: 500.0,
      paidAmount: 0.0,
      dueAmount: 580.0,
    },
    orderStatus: "On Hold",
    deliveryPartner: {
      name: "Steadfast",
      status: "In Review",
      trackingId: "209081685",
    },
    deliveryFee: 80.0,
    deliveryType: "Regular",
  },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    "On Hold": "bg-orange-50 text-orange-700 border-orange-200",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    "Ready To Ship": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "In Transit": "bg-indigo-50 text-indigo-700 border-indigo-200",
    Delivered: "bg-green-50 text-green-700 border-green-200",
    Flagged: "bg-red-50 text-red-700 border-red-200",
    Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

function SourceBadge({ source }: { source: "Website" | "WooCommerce" }) {
  if (source === "WooCommerce") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-purple-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
        WOO
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-700">
      Website
    </span>
  );
}

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "All">("All");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const filteredOrders =
    activeTab === "All"
      ? mockOrders
      : mockOrders.filter((order) => order.orderStatus === activeTab);

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h1 className="text-xl font-semibold text-foreground">Orders</h1>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              F
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export Orders</DropdownMenuItem>
                <DropdownMenuItem>Import Orders</DropdownMenuItem>
                <DropdownMenuItem>Bulk Update</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Order
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="border-b border-border bg-card px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.status)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab.status
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded px-1 text-xs",
                    activeTab === tab.status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter Column
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select defaultValue="50">
                <SelectTrigger className="h-8 w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex h-8 min-w-8 items-center justify-center rounded bg-primary px-2 text-sm font-medium text-primary-foreground">
              1
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-background">
          <Table>
            <TableHeader>
              <TableRow className="bg-card hover:bg-card">
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[140px]">Invoice No</TableHead>
                <TableHead className="min-w-[180px]">Date</TableHead>
                <TableHead className="min-w-[120px]">Follow Up Date</TableHead>
                <TableHead className="min-w-[120px]">Auto-Approve Date</TableHead>
                <TableHead className="min-w-[200px]">Customer</TableHead>
                <TableHead className="min-w-[120px]">Pick Up Address</TableHead>
                <TableHead className="min-w-[140px]">Payments Info</TableHead>
                <TableHead className="min-w-[100px]">Order Status</TableHead>
                <TableHead className="min-w-[140px]">Delivery Partner</TableHead>
                <TableHead className="min-w-[100px]">Delivery Fee</TableHead>
                <TableHead className="min-w-[100px]">Cancel Reason</TableHead>
                <TableHead className="min-w-[100px]">Internal Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className={cn(
                    "group",
                    selectedOrders.includes(order.id) && "bg-primary/5"
                  )}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelect(order.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>Order details</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>Copy order</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Printer className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>Print invoice</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Edit className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>Edit order</TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="font-medium text-primary">
                        {order.invoiceNo}
                      </span>
                      <SourceBadge source={order.source} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div className="flex gap-2">
                        <span className="font-medium text-foreground">Created</span>
                        <span className="text-muted-foreground">{order.createdAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium text-foreground">Shipping</span>
                        <span className="text-muted-foreground">{order.shippingDate}</span>
                      </div>
                      {order.statusDate && (
                        <div className="flex gap-2">
                          <span className="font-medium text-foreground">{order.statusType}</span>
                          <span className="text-muted-foreground">{order.statusDate}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.followUpDate && (
                      <span className="text-xs text-muted-foreground">
                        {order.followUpDate}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.autoApproveDate && (
                      <span className="text-xs text-muted-foreground">
                        {order.autoApproveDate}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {order.customer.name}
                        </span>
                        {order.customer.isNew && (
                          <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 text-[10px] px-1.5 py-0">
                            NEW
                          </Badge>
                        )}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>Customer info</TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{order.customer.phone}</span>
                        <Copy className="h-3 w-3 cursor-pointer hover:text-foreground" />
                        <Phone className="h-3 w-3 cursor-pointer text-emerald-600" />
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {order.customer.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px]"
                      >
                        Warehouse
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {order.pickupAddress}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sales Amount:</span>
                        <span className="font-medium text-foreground">
                          BDT {order.payments.salesAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Paid Amount:</span>
                        <span className="font-medium text-foreground">
                          BDT {order.payments.paidAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Amount:</span>
                        <span className="font-medium text-foreground">
                          BDT {order.payments.dueAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.orderStatus} />
                  </TableCell>
                  <TableCell>
                    {order.deliveryPartner && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                            <ExternalLink className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm font-medium">
                            {order.deliveryPartner.name}
                          </span>
                        </div>
                        {order.deliveryPartner.status && (
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                              {order.deliveryPartner.status}
                            </span>
                          </div>
                        )}
                        {order.deliveryPartner.trackingId && (
                          <span className="text-xs text-muted-foreground">
                            ID: {order.deliveryPartner.trackingId}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.deliveryFee > 0 && (
                      <div className="space-y-1">
                        <span className="text-sm font-medium">
                          BDT {order.deliveryFee.toFixed(2)}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-orange-200 bg-orange-50 text-orange-600 text-[10px]"
                        >
                          {order.deliveryType}
                        </Badge>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.cancelReason && (
                      <span className="text-xs text-muted-foreground">
                        {order.cancelReason}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
