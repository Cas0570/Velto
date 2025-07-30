import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { VeltoLogo } from "@/components/VeltoLogo";
import { VeltoCard } from "@/components/VeltoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Zap, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthProps {
  mode?: "sign-in" | "sign-up";
}

export const Auth = ({ mode = "sign-in" }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(mode === "sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, setActive } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Sign In Logic
        const result = await signIn?.create({
          identifier: email,
          password,
        });

        if (result?.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/dashboard");
        }
      } else {
        // Sign Up Logic
        const result = await signUp?.create({
          emailAddress: email,
          password,
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" ") || undefined,
        });

        if (result?.status === "complete") {
          await setActiveSignUp({ session: result.createdSessionId });
          navigate("/dashboard");
        } else if (result?.status === "missing_requirements") {
          // Handle email verification if required
          setError("Please check your email to verify your account.");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Authentication error:", err);

      // Handle specific Clerk errors
      if (err.errors) {
        const errorMessage = err.errors[0]?.message || "An error occurred";
        setError(errorMessage);
      } else {
        setError(
          isLogin ? "Invalid email or password" : "Failed to create account"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isValid = email && password && (isLogin || name);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div className="space-y-6">
            <VeltoLogo size="xl" />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground leading-tight">
                Request. Pay. Done.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The fastest way to request payments from anyone, anywhere.
                Create payment links in seconds and get paid instantly.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground font-medium">
                Create payment links in under 30 seconds
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground font-medium">
                Secure payments powered by Stripe
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground font-medium">
                Real-time notifications and tracking
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex flex-col justify-center">
          <div className="lg:hidden mb-8 text-center">
            <VeltoLogo size="lg" className="justify-center" />
          </div>

          <VeltoCard hover={false} className="w-full max-w-md mx-auto">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {isLogin ? "Welcome back" : "Get started"}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin
                    ? "Sign in to your Velto account"
                    : "Create your account to start requesting payments"}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-xl"
                      required={!isLogin}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl"
                    required
                    disabled={loading}
                  />
                  {!isLogin && (
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={!isValid || loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                      // Update URL without page reload
                      window.history.pushState(
                        {},
                        "",
                        isLogin ? "/sign-up" : "/sign-in"
                      );
                    }}
                    className="text-primary hover:text-primary-hover font-medium transition-colors"
                    disabled={loading}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </VeltoCard>
        </div>
      </div>
    </div>
  );
};
