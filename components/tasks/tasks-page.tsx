"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Filter,
  Flag,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";

type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
type TaskStatus = "To Do" | "In Progress" | "Review" | "Completed";
type TaskCategory = "Order" | "Customer" | "Inventory" | "Finance" | "General";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  assignee: string;
  dueDate: string;
  createdAt: string;
  relatedId?: string;
  tags?: string[];
}

const statusColumns: { status: TaskStatus; color: string }[] = [
  { status: "To Do", color: "bg-gray-100" },
  { status: "In Progress", color: "bg-blue-50" },
  { status: "Review", color: "bg-amber-50" },
  { status: "Completed", color: "bg-emerald-50" },
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up with customer NAHIDUL",
    description: "Customer requested callback regarding order FX-0005",
    priority: "High",
    status: "To Do",
    category: "Customer",
    assignee: "John Doe",
    dueDate: "Jan 25, 2026",
    createdAt: "Jan 24, 2026",
    relatedId: "FX-0005",
    tags: ["callback", "urgent"],
  },
  {
    id: "2",
    title: "Process pending order FX-0003",
    description: "Verify payment and prepare for shipping",
    priority: "Medium",
    status: "In Progress",
    category: "Order",
    assignee: "Jane Smith",
    dueDate: "Jan 24, 2026",
    createdAt: "Jan 23, 2026",
    relatedId: "FX-0003",
  },
  {
    id: "3",
    title: "Review inventory levels",
    description: "Check stock for low inventory items and create reorder list",
    priority: "Low",
    status: "To Do",
    category: "Inventory",
    assignee: "Mike Johnson",
    dueDate: "Jan 26, 2026",
    createdAt: "Jan 22, 2026",
    tags: ["weekly"],
  },
  {
    id: "4",
    title: "Resolve delivery issue for FX-0004",
    description: "Contact Steadfast regarding delayed delivery",
    priority: "Urgent",
    status: "In Progress",
    category: "Order",
    assignee: "John Doe",
    dueDate: "Jan 24, 2026",
    createdAt: "Jan 24, 2026",
    relatedId: "FX-0004",
    tags: ["delivery", "escalation"],
  },
  {
    id: "5",
    title: "Update customer payment records",
    description: "Reconcile payments received today",
    priority: "Medium",
    status: "Review",
    category: "Finance",
    assignee: "Sarah Wilson",
    dueDate: "Jan 24, 2026",
    createdAt: "Jan 24, 2026",
  },
  {
    id: "6",
    title: "Prepare monthly sales report",
    description: "Compile sales data for January 2026",
    priority: "Low",
    status: "Completed",
    category: "General",
    assignee: "Jane Smith",
    dueDate: "Jan 31, 2026",
    createdAt: "Jan 20, 2026",
    tags: ["report", "monthly"],
  },
  {
    id: "7",
    title: "Contact supplier for bulk order",
    description: "Request quote for 500 units of product SKU-001",
    priority: "Medium",
    status: "To Do",
    category: "Inventory",
    assignee: "Mike Johnson",
    dueDate: "Jan 27, 2026",
    createdAt: "Jan 24, 2026",
  },
  {
    id: "8",
    title: "Verify new customer documents",
    description: "Review KYC documents for 3 new business customers",
    priority: "High",
    status: "Review",
    category: "Customer",
    assignee: "Sarah Wilson",
    dueDate: "Jan 25, 2026",
    createdAt: "Jan 23, 2026",
    tags: ["compliance"],
  },
];

const priorityConfig: Record<TaskPriority, { color: string; icon: typeof Flag }> = {
  Low: { color: "text-gray-500 bg-gray-100", icon: Flag },
  Medium: { color: "text-blue-600 bg-blue-100", icon: Flag },
  High: { color: "text-orange-600 bg-orange-100", icon: Flag },
  Urgent: { color: "text-red-600 bg-red-100", icon: AlertCircle },
};

const categoryConfig: Record<TaskCategory, string> = {
  Order: "bg-purple-100 text-purple-700",
  Customer: "bg-emerald-100 text-emerald-700",
  Inventory: "bg-amber-100 text-amber-700",
  Finance: "bg-blue-100 text-blue-700",
  General: "bg-gray-100 text-gray-700",
};

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = priorityConfig[priority];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        config.color
      )}
    >
      <Icon className="h-3 w-3" />
      {priority}
    </span>
  );
}

function CategoryBadge({ category }: { category: TaskCategory }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        categoryConfig[category]
      )}
    >
      {category}
    </span>
  );
}

function TaskCard({ task, onStatusChange }: { task: Task; onStatusChange: (id: string, status: TaskStatus) => void }) {
  return (
    <Card className="group cursor-pointer transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <PriorityBadge priority={task.priority} />
              <CategoryBadge category={task.category} />
            </div>
            <h4 className="font-medium text-foreground leading-snug">{task.title}</h4>
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
            {task.relatedId && (
              <span className="inline-flex items-center text-xs text-primary font-medium">
                #{task.relatedId}
              </span>
            )}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "To Do")}>
                Move to To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "In Progress")}>
                Move to In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "Review")}>
                Move to Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "Completed")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
              {task.assignee.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="text-xs text-muted-foreground">{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {task.dueDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskListRow({ task, onStatusChange, selected, onSelect }: { 
  task: Task; 
  onStatusChange: (id: string, status: TaskStatus) => void;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-4 border-b border-border px-4 py-3 transition-colors hover:bg-muted/50",
        selected && "bg-primary/5"
      )}
    >
      <Checkbox checked={selected} onCheckedChange={() => onSelect(task.id)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">{task.title}</h4>
          {task.relatedId && (
            <span className="text-xs text-primary font-medium">#{task.relatedId}</span>
          )}
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground truncate">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <CategoryBadge category={task.category} />
        <PriorityBadge priority={task.priority} />
        <Select
          value={task.status}
          onValueChange={(value) => onStatusChange(task.id, value as TaskStatus)}
        >
          <SelectTrigger className="h-8 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusColumns.map((col) => (
              <SelectItem key={col.status} value={col.status}>
                {col.status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 w-28">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
            {task.assignee.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="text-xs text-muted-foreground truncate">{task.assignee.split(" ")[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground w-24">
          <Calendar className="h-3 w-3" />
          {task.dueDate.split(", ")[0]}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function CreateTaskDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" placeholder="Enter task title..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Add a description..." rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue="Medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue="General">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Order">Order</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Inventory">Inventory</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="related">Related Order/Customer ID</Label>
            <Input id="related" placeholder="e.g., FX-0001 or CUST-001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" placeholder="e.g., urgent, callback" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board");
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    if (filterCategory !== "all" && task.category !== filterCategory) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const tasksByStatus = statusColumns.reduce(
    (acc, col) => {
      acc[col.status] = filteredTasks.filter((task) => task.status === col.status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    overdue: 2,
    dueToday: 3,
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your team's tasks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export Tasks</DropdownMenuItem>
              <DropdownMenuItem>Import Tasks</DropdownMenuItem>
              <DropdownMenuItem>Bulk Assign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateTaskDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 border-b border-border bg-card px-6 py-4">
        <Card className="border-0 bg-muted/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-semibold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Due Today</p>
              <p className="text-2xl font-semibold text-amber-600">{stats.dueToday}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-muted/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-semibold text-red-600">{stats.overdue}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="h-9 w-64 pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="h-9 w-32">
              <Flag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 w-32">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Order">Order</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border p-1">
            <Button
              variant={view === "board" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setView("board")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-background p-6">
        {view === "board" ? (
          <div className="grid grid-cols-4 gap-4 h-full">
            {statusColumns.map((column) => (
              <div key={column.status} className="flex flex-col">
                <div
                  className={cn(
                    "mb-3 flex items-center justify-between rounded-lg px-3 py-2",
                    column.color
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{column.status}</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded bg-background px-1.5 text-xs font-medium text-muted-foreground">
                      {tasksByStatus[column.status]?.length || 0}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-3 overflow-auto">
                  {tasksByStatus[column.status]?.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader className="border-b border-border py-3 px-4">
              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <Checkbox
                  checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                  onCheckedChange={() => {
                    if (selectedTasks.length === filteredTasks.length) {
                      setSelectedTasks([]);
                    } else {
                      setSelectedTasks(filteredTasks.map((t) => t.id));
                    }
                  }}
                />
                <span className="flex-1">Task</span>
                <span className="w-24">Category</span>
                <span className="w-20">Priority</span>
                <span className="w-32">Status</span>
                <span className="w-28">Assignee</span>
                <span className="w-24">Due Date</span>
                <span className="w-8" />
              </div>
            </CardHeader>
            <div>
              {filteredTasks.map((task) => (
                <TaskListRow
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  selected={selectedTasks.includes(task.id)}
                  onSelect={toggleSelect}
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
