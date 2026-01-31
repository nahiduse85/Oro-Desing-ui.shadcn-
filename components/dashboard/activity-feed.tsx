import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    user: "Sarah Chen",
    initials: "SC",
    action: "created a new order",
    target: "ORD-7892",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: "Mike Johnson",
    initials: "MJ",
    action: "updated inventory for",
    target: "SKU-4521",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: "Emma Wilson",
    initials: "EW",
    action: "approved purchase order",
    target: "PO-1284",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Alex Rivera",
    initials: "AR",
    action: "shipped order",
    target: "ORD-7890",
    time: "2 hours ago",
  },
  {
    id: 5,
    user: "David Park",
    initials: "DP",
    action: "added new customer",
    target: "CloudNine Solutions",
    time: "3 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary text-xs text-foreground">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium text-accent">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
