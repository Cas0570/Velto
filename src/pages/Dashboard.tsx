import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { TopNavigation } from "@/components/TopNavigation";
import { PaymentRequestCard } from "@/components/PaymentRequestCard";
import { Button } from "@/components/ui/button";
import { VeltoCard } from "@/components/VeltoCard";
import { Plus, Search, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PaymentStatus } from "@/types";

// Mock requests data (replace with real API calls later)
const mockRequests = [
  {
    id: "1",
    amount: 150.0,
    description: "Website design project - First milestone payment",
    status: "paid" as PaymentStatus,
    createdAt: "2024-01-15",
    link: "https://velto.app/pay/abc123",
    paymentCount: 1,
  },
  {
    id: "2",
    amount: 75.5,
    description: "Dinner split with friends at Restaurant De Kas",
    status: "pending" as PaymentStatus,
    createdAt: "2024-01-18",
    link: "https://velto.app/pay/def456",
    paymentCount: 0,
  },
  {
    id: "3",
    amount: 200.0,
    description: "Consulting session - Digital marketing strategy",
    status: "pending" as PaymentStatus,
    createdAt: "2024-01-16",
    link: "https://velto.app/pay/ghi789",
    paymentCount: 0,
  },
  {
    id: "4",
    amount: 45.0,
    description: "Utilities split - January electricity bill",
    status: "expired" as PaymentStatus,
    createdAt: "2024-01-10",
    link: "https://velto.app/pay/jkl012",
    paymentCount: 0,
  },
  {
    id: "5",
    amount: 25.0,
    description: "Coffee meetup payment",
    status: "paid" as PaymentStatus,
    createdAt: "2024-01-20",
    link: "https://velto.app/pay/mno345",
    paymentCount: 3,
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const stats = {
    total: mockRequests.reduce((sum, req) => sum + req.amount, 0),
    paid: mockRequests
      .filter((req) => req.status === "paid")
      .reduce((sum, req) => sum + req.amount, 0),
    pending: mockRequests.filter((req) => req.status === "pending").length,
  };

  const handleCreateRequest = () => {
    navigate("/create");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleViewDetails = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  // Show loading state while user data is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userName = user?.firstName || user?.fullName?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your payment requests and track your earnings
            </p>
          </div>
          <Button
            onClick={handleCreateRequest}
            variant="gradient"
            size="lg"
            className="self-stretch sm:self-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Request
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <VeltoCard hover={false} className="text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(stats.total)}
              </p>
              <p className="text-sm text-muted-foreground">Total Requested</p>
            </div>
          </VeltoCard>

          <VeltoCard hover={false} className="text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-success mb-2" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(stats.paid)}
              </p>
              <p className="text-sm text-muted-foreground">Received</p>
            </div>
          </VeltoCard>

          <VeltoCard hover={false} className="text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Clock className="h-8 w-8 text-warning mb-2" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.pending}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </VeltoCard>
        </div>

        {/* Welcome message for new users */}
        {mockRequests.length === 0 && (
          <VeltoCard hover={false} className="text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-xl font-semibold text-foreground mb-2">
                  Welcome to Velto! 🎉
                </p>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You're all set up! Create your first payment request to start
                  receiving payments in seconds.
                </p>
              </div>
              <Button
                onClick={handleCreateRequest}
                variant="gradient"
                size="lg"
                className="mx-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Request
              </Button>
            </div>
          </VeltoCard>
        )}

        {/* Payment Requests */}
        {mockRequests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Your Payment Requests
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {mockRequests.map((request) => (
                <PaymentRequestCard
                  key={request.id}
                  request={request}
                  onCopy={(link) => {
                    navigator.clipboard.writeText(link);
                    // TODO: Add toast notification
                  }}
                  onCardClick={() => handleViewDetails(request.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
