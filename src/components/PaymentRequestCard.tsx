import { VeltoCard } from "./VeltoCard";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/button";
import { Copy, Share2, QrCode } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { PaymentRequestCardProps } from "@/types";

export const PaymentRequestCard = ({
  request,
  className,
  onCopy,
  onShare,
  onShowQR,
  onCardClick,
}: PaymentRequestCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <VeltoCard
      className={cn("group p-4 cursor-pointer", className)}
      onClick={onCardClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium text-sm line-clamp-2 mb-1">
              {request.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatDate(request.createdAt)}</span>
              {request.paymentCount > 0 && (
                <>
                  <span>•</span>
                  <span>{request.paymentCount}x paid</span>
                </>
              )}
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">
            {formatCurrency(request.amount)}
          </h3>

          {/* Actions */}
          {request.status === "pending" && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy?.(request.link)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare?.(request.link)}
                className="h-8 w-8 p-0"
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShowQR?.(request.link)}
                className="h-8 w-8 p-0"
              >
                <QrCode className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </VeltoCard>
  );
};
