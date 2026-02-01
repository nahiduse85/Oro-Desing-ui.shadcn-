"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  CreditCard,
  Users,
  Truck,
  Puzzle,
  Search,
  X,
  Upload,
  Check,
  ExternalLink,
  Mail,
  MoreHorizontal,
  Shield,
  Pencil,
  Trash2,
} from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SettingsTab =
  | "business"
  | "subscription"
  | "users"
  | "delivery"
  | "integrations";

const menuItems = [
  { id: "business" as const, label: "Business Settings", icon: Building2 },
  { id: "subscription" as const, label: "Plan & Subscription", icon: CreditCard },
  { id: "users" as const, label: "Users & Roles", icon: Users },
  { id: "delivery" as const, label: "Delivery Partners", icon: Truck },
  { id: "integrations" as const, label: "Integrations", icon: Puzzle },
];

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("business");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[75vw] max-w-[1200px] max-h-[85vh]",
            "bg-card rounded-[14px] shadow-2xl",
            "flex flex-col overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-200"
          )}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage business, users, billing, and system preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 h-9 bg-muted/50 border-0"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Navigation */}
            <div className="w-56 shrink-0 bg-muted/30 p-3">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      activeTab === item.id
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "business" && <BusinessSettings />}
              {activeTab === "subscription" && <SubscriptionSettings />}
              {activeTab === "users" && <UsersSettings />}
              {activeTab === "delivery" && <DeliverySettings />}
              {activeTab === "integrations" && <IntegrationsSettings />}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-card px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Last saved 2 minutes ago
            </span>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function BusinessSettings() {
  return (
    <div className="space-y-8">
      {/* Business Profile */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Business Profile</h3>
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Acme Corporation Ltd." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select defaultValue="ecommerce">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="wholesale">Wholesale</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Business Logo</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="bdt">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bdt">BDT - Bangladeshi Taka</SelectItem>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="dhaka">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                  <SelectItem value="kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                  <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Address */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Contact & Address</h3>
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+880 1712 345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="info@acmecorp.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select defaultValue="dhaka">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select defaultValue="dhaka">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="gazipur">Gazipur</SelectItem>
                  <SelectItem value="narayanganj">Narayanganj</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              defaultValue="House 42, Road 11, Block E, Banani, Dhaka 1213"
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* Invoice & Branding */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Invoice & Branding</h3>
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
            <Input id="invoicePrefix" defaultValue="INV-" className="w-40" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Logo on Invoice</Label>
              <p className="text-sm text-muted-foreground">
                Display your business logo on generated invoices
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceFooter">Invoice Footer Note</Label>
            <Textarea
              id="invoiceFooter"
              defaultValue="Thank you for your business! For any queries, contact us at support@acmecorp.com"
              rows={2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SubscriptionSettings() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Current Plan</h3>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Professional Plan</span>
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Monthly billing</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">$49</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Next billing date: <span className="text-foreground font-medium">February 15, 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Usage</h3>
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Orders</span>
              <span className="text-muted-foreground">2,847 / 5,000</span>
            </div>
            <Progress value={57} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Products</span>
              <span className="text-muted-foreground">1,234 / 2,000</span>
            </div>
            <Progress value={62} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Users</span>
              <span className="text-muted-foreground">8 / 10</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div className="flex items-center justify-between text-sm pt-2">
            <span>Inventory</span>
            <Badge variant="secondary">Unlimited</Badge>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Plan Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Upgrade Plan</Button>
          <Button variant="outline">Compare Plans</Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Billing History
          </Button>
        </div>
      </section>
    </div>
  );
}

function UsersSettings() {
  const users = [
    { name: "Ahmed Rahman", email: "ahmed@acmecorp.com", role: "Admin", status: "Active", avatar: "" },
    { name: "Fatima Khan", email: "fatima@acmecorp.com", role: "Manager", status: "Active", avatar: "" },
    { name: "Karim Hassan", email: "karim@acmecorp.com", role: "Sales", status: "Active", avatar: "" },
    { name: "Nusrat Jahan", email: "nusrat@acmecorp.com", role: "Accounts", status: "Invited", avatar: "" },
  ];

  const roles = [
    { name: "Admin", users: 1, permissions: "Full access to all features" },
    { name: "Manager", users: 1, permissions: "Manage orders, inventory, and reports" },
    { name: "Sales", users: 1, permissions: "Create and manage orders" },
    { name: "Accounts", users: 1, permissions: "Access to finance and payments" },
    { name: "Warehouse", users: 0, permissions: "Inventory and shipping only" },
  ];

  return (
    <div className="space-y-8">
      {/* Users Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Team Members</h3>
          <span className="text-sm text-muted-foreground">4 of 10 seats used</span>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Roles */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Roles & Permissions</h3>
        <div className="grid grid-cols-1 gap-3">
          {roles.map((role) => (
            <div
              key={role.name}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{role.name}</p>
                  <p className="text-sm text-muted-foreground">{role.permissions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{role.users} users</span>
                <Button variant="outline" size="sm">
                  Edit Permissions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Invite User */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Invite New User</h3>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="inviteEmail">Email Address</Label>
              <Input id="inviteEmail" type="email" placeholder="colleague@company.com" />
            </div>
            <div className="w-40 space-y-2">
              <Label>Role</Label>
              <Select defaultValue="sales">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function DeliverySettings() {
  const couriers = [
    { name: "Pathao", logo: "P", connected: true, color: "bg-red-500" },
    { name: "Steadfast", logo: "S", connected: true, color: "bg-teal-500" },
    { name: "RedX", logo: "R", connected: false, color: "bg-orange-500" },
    { name: "Paperfly", logo: "P", connected: false, color: "bg-blue-500" },
    { name: "Local Courier", logo: "L", connected: true, color: "bg-gray-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Courier Integrations */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Courier Integrations</h3>
        <div className="grid grid-cols-2 gap-4">
          {couriers.map((courier) => (
            <div
              key={courier.name}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold",
                    courier.color
                  )}
                >
                  {courier.logo}
                </div>
                <div>
                  <p className="font-medium">{courier.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {courier.connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>
              <Button variant={courier.connected ? "outline" : "default"} size="sm">
                {courier.connected ? "Manage" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Options */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Delivery Options</h3>
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="space-y-2">
            <Label>Default Courier</Label>
            <Select defaultValue="steadfast">
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pathao">Pathao</SelectItem>
                <SelectItem value="steadfast">Steadfast</SelectItem>
                <SelectItem value="local">Local Courier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-assign Courier</Label>
              <p className="text-sm text-muted-foreground">
                Automatically assign courier based on delivery zone
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include COD Charge in Invoice</Label>
              <p className="text-sm text-muted-foreground">
                Add cash on delivery charges to customer invoice
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </section>
    </div>
  );
}

function IntegrationsSettings() {
  const integrations = [
    {
      name: "WooCommerce",
      description: "Sync products and orders from your WooCommerce store",
      icon: "W",
      color: "bg-purple-500",
      connected: true,
    },
    {
      name: "Facebook Orders",
      description: "Import orders from Facebook Shop and Messenger",
      icon: "f",
      color: "bg-blue-600",
      connected: false,
    },
    {
      name: "WhatsApp",
      description: "Send order notifications via WhatsApp",
      icon: "W",
      color: "bg-green-500",
      connected: true,
    },
    {
      name: "SMS Gateway",
      description: "Send SMS notifications to customers",
      icon: "S",
      color: "bg-cyan-500",
      connected: true,
    },
  ];

  const paymentGateways = [
    { name: "bKash", icon: "b", color: "bg-pink-500", connected: true },
    { name: "Nagad", icon: "N", color: "bg-orange-500", connected: false },
    { name: "Card Payment", icon: "C", color: "bg-slate-700", connected: false },
    { name: "Binance Pay", icon: "B", color: "bg-yellow-500", connected: false },
  ];

  return (
    <div className="space-y-8">
      {/* Integrations */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Connected Apps</h3>
        <div className="grid grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-xl border border-border bg-card p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold",
                      integration.color
                    )}
                  >
                    {integration.icon}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    {integration.connected && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
              <Button
                variant={integration.connected ? "outline" : "default"}
                size="sm"
                className="w-full"
              >
                {integration.connected ? "Configure" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Gateways */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Payment Gateways</h3>
        <div className="grid grid-cols-4 gap-4">
          {paymentGateways.map((gateway) => (
            <div
              key={gateway.name}
              className="rounded-xl border border-border bg-card p-4 text-center space-y-3"
            >
              <div
                className={cn(
                  "mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-lg",
                  gateway.color
                )}
              >
                {gateway.icon}
              </div>
              <p className="font-medium text-sm">{gateway.name}</p>
              {gateway.connected ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 text-xs">
                  Active
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
