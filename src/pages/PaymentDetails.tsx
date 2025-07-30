import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { VeltoCard } from "@/components/VeltoCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Share2, QrCode, Trash2, Copy } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PaymentStatus } from "@/types";
import { useUser } from "@clerk/clerk-react";

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: undefined,
};

// Extended mock request with payment details
const mockRequestDetails = {
  id: "1",
  amount: 150.0,
  description: "Website design project - First milestone payment",
  status: "paid" as PaymentStatus,
  createdAt: "2024-01-15",
  link: "https://velto.app/pay/abc123",
  paymentCount: 3,
  totalSettled: 450.0,
  payments: [
    {
      id: "payment-1",
      paidBy: "Alice Johnson",
      amount: 150.0,
      paidAt: "2024-01-16T10:30:00Z",
      paymentId: "pi_abc123",
    },
    {
      id: "payment-2",
      paidBy: "Bob Smith",
      amount: 150.0,
      paidAt: "2024-01-17T14:22:00Z",
      paymentId: "pi_def456",
    },
    {
      id: "payment-3",
      paidBy: "Charlie Wilson",
      amount: 150.0,
      paidAt: "2024-01-18T09:15:00Z",
      paymentId: "pi_ghi789",
    },
  ],
};

export const PaymentDetails = () => {
  const { id: requestId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [showQR, setShowQR] = useState(false);

  // In real app, you would fetch the request by requestId
  const request = mockRequestDetails;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusText = () => {
    if (request.status === "paid") {
      return `Paid ${request.paymentCount}x`;
    } else if (request.status === "expired") {
      return `Paid ${request.paymentCount}x - expired`;
    } else {
      return "Not paid yet";
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: request.description,
        text: `Payment request for ${formatCurrency(request.amount)}`,
        url: request.link,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(request.link);
    // Toast notification would go here
  };

  const handleDelete = () => {
    // Delete functionality would go here
    console.log("Delete request:", request.id);
    // After deletion, navigate back to dashboard
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  // If request not found (in real app)
  if (!requestId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <VeltoCard className="text-center py-12">
          <p className="text-lg font-medium text-foreground mb-4">
            Request not found
          </p>
          <Button onClick={handleBack}>Back to Dashboard</Button>
        </VeltoCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Payment Details
          </h1>
        </div>

        <div className="space-y-6">
          {/* Main Details Card */}
          <VeltoCard className="p-6 space-y-4">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {request.description}
              </h2>
              <StatusBadge status={request.status} />
            </div>

            {/* Request Amount */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Request of</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(request.amount)} p. p.
              </p>
            </div>

            {/* Payment Status */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-base font-medium text-foreground">
                {getStatusText()}
              </p>
            </div>

            {/* Total Settled */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total settled up</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(request.totalSettled)}
              </p>
            </div>

            {/* Creation Date */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Creation date</p>
              <p className="text-base text-foreground">
                {formatDate(request.createdAt)}
              </p>
            </div>
          </VeltoCard>

          {/* Payments List */}
          {request.payments.length > 0 && (
            <VeltoCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Payments Received ({request.payments.length})
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {request.payments.map((payment, index) => (
                  <AccordionItem
                    key={payment.id}
                    value={payment.id}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {payment.paidBy}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDateTime(payment.paidAt)}
                          </p>
                        </div>
                        <p className="font-semibold text-primary">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Payment ID:
                          </span>
                          <span className="font-mono text-foreground">
                            {payment.paymentId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Execution date:
                          </span>
                          <span className="text-foreground">
                            {formatDateTime(payment.paidAt)}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </VeltoCard>
          )}

          {/* QR Code */}
          <VeltoCard className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">QR Code</h3>
              <div className="w-48 h-48 bg-white mx-auto rounded-lg flex items-center justify-center">
                <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this QR code for easy payment
              </p>
            </div>
          </VeltoCard>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" className="h-12" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Delete Button */}
          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Request
          </Button>
        </div>
      </div>
    </div>
  );
};
