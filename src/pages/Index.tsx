import { useState } from "react";
import { Auth } from "./Auth";
import { Dashboard } from "./Dashboard";
import { CreateRequest } from "./CreateRequest";
import { Search } from "./Search";
import { PaymentDetails } from "./PaymentDetails";

const Index = () => {
  const [currentView, setCurrentView] = useState<
    "auth" | "dashboard" | "create" | "search" | "details"
  >("auth");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setTimeout(() => {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }, 1000);
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    // Simulate signup
    setTimeout(() => {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }, 1000);
  };

  const handleCreateRequest = () => {
    setCurrentView("create");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleSearch = () => {
    setCurrentView("search");
  };

  const handleViewDetails = (requestId: string) => {
    setSelectedRequestId(requestId);
    setCurrentView("details");
  };

  // if (!isAuthenticated) {
  //   return <Auth onLogin={handleLogin} onSignUp={handleSignUp} />;
  // }

  if (currentView === "create") {
    return <CreateRequest onBack={handleBackToDashboard} />;
  }

  if (currentView === "search") {
    return (
      <Search
        onBack={handleBackToDashboard}
        onViewDetails={handleViewDetails}
      />
    );
  }

  if (currentView === "details") {
    return (
      <PaymentDetails
        requestId={selectedRequestId}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard
      onCreateRequest={handleCreateRequest}
      onSearch={handleSearch}
      onViewDetails={handleViewDetails}
    />
  );
};

export default Index;
