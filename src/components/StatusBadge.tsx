import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { StatusBadgeProps } from "@/types";

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    paid: {
      label: "Paid",
      variant: "default" as const,
      className: "bg-success text-success-foreground hover:bg-success/90",
    },
    pending: {
      label: "Not paid yet",
      variant: "secondary" as const,
      className: "bg-warning text-warning-foreground hover:bg-warning/90",
    },
    expired: {
      label: "Expired",
      variant: "secondary" as const,
      className: "bg-muted text-muted-foreground",
    },
    failed: {
      label: "Failed",
      variant: "destructive" as const,
      className:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold shadow-md",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
};
