import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { PaymentRequestCard } from "@/components/PaymentRequestCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VeltoCard } from "@/components/VeltoCard";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { PaymentStatus } from "@/types";
import { useUser } from "@clerk/clerk-react";

// Mock data (same as Dashboard)
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: undefined,
};

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

export const Search = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PaymentStatus>(
    "all"
  );

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch = request.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleViewDetails = (requestId: string) => {
    navigate(`/request/${requestId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

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
          <h1 className="text-2xl font-bold text-foreground">Search</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payment requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
            autoFocus
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="whitespace-nowrap"
          >
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
            className="whitespace-nowrap"
          >
            Not paid
          </Button>
          <Button
            variant={statusFilter === "paid" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("paid")}
            className="whitespace-nowrap"
          >
            Paid
          </Button>
          <Button
            variant={statusFilter === "expired" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("expired")}
            className="whitespace-nowrap"
          >
            Expired
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((request) => (
                <PaymentRequestCard
                  key={request.id}
                  request={request}
                  onCopy={(link) => {
                    navigator.clipboard.writeText(link);
                    // Toast notification would go here
                  }}
                  onCardClick={() => handleViewDetails(request.id)}
                />
              ))}
            </div>
          ) : (
            <VeltoCard hover={false} className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    No results found
                  </p>
                  <p className="text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </div>
              </div>
            </VeltoCard>
          )}
        </div>
      </div>
    </div>
  );
};
