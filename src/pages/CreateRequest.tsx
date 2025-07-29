import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { CreateRequestForm } from "@/components/CreateRequestForm";
import { VeltoCard } from "@/components/VeltoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2, QrCode, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock user
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: undefined,
};

export const CreateRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [requestData, setRequestData] = useState<{
    amount: number;
    description: string;
  } | null>(null);

  const handleCreateRequest = async (data: {
    amount: number;
    description: string;
  }) => {
    setLoading(true);
    setRequestData(data);

    // Simulate API call
    setTimeout(() => {
      const mockLink = `https://velto.app/pay/${Math.random()
        .toString(36)
        .substring(7)}`;
      setPaymentLink(mockLink);
      setStep("success");
      setLoading(false);
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    // Toast notification would go here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Payment Request",
        text: `Please pay ${formatCurrency(requestData?.amount || 0)} for: ${
          requestData?.description
        }`,
        url: paymentLink,
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation user={mockUser} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {step === "form"
                ? "Create Payment Request"
                : "Payment Link Created!"}
            </h1>
            <p className="text-muted-foreground">
              {step === "form"
                ? "Fill in the details to generate your payment link"
                : "Your payment link is ready to share"}
            </p>
          </div>
        </div>

        {step === "form" ? (
          <CreateRequestForm onSubmit={handleCreateRequest} loading={loading} />
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Success Animation */}
            <div className="text-center">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>

            {/* Payment Details */}
            <VeltoCard hover={false} className="text-center">
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(requestData?.amount || 0)}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {requestData?.description}
                  </p>
                </div>

                {/* Payment Link */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Payment Link
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      value={paymentLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  <Button
                    variant="gradient"
                    onClick={handleCopyLink}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="w-full"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  <Button variant="outline" className="w-full">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </VeltoCard>

            {/* WhatsApp Quick Share */}
            <VeltoCard hover={false}>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Quick Share via WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground">
                  Send this payment request directly to someone via WhatsApp
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 border-[#25D366]"
                  onClick={() => {
                    const message = `Hi! Please pay ${formatCurrency(
                      requestData?.amount || 0
                    )} for: ${
                      requestData?.description
                    }. You can pay here: ${paymentLink}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Share on WhatsApp
                </Button>
              </div>
            </VeltoCard>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                className="flex-1"
              >
                View Dashboard
              </Button>
              <Button
                variant="gradient"
                onClick={() => {
                  setStep("form");
                  setRequestData(null);
                  setPaymentLink("");
                }}
                className="flex-1"
              >
                Create Another Request
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
