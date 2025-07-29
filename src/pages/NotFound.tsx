import { VeltoCard } from "@/components/VeltoCard";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <VeltoCard className="max-w-md w-full text-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            Oops! The page you are looking for does not exist.
          </p>
          <Button asChild variant="gradient" className="w-full max-w-xs">
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </VeltoCard>
    </div>
  );
};

export default NotFound;
