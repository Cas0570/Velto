import { useUser, useClerk } from "@clerk/clerk-react";
import { VeltoLogo } from "./VeltoLogo";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TopNavigationProps {
  onSearch?: () => void;
}

export const TopNavigation = ({ onSearch }: TopNavigationProps) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  const handleUserSettings = () => {
    openUserProfile();
  };

  const handleSettings = () => {
    // Navigate to settings page
    window.location.href = "/settings";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <VeltoLogo size="md" />

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <Button variant="ghost" size="icon" onClick={onSearch}>
            <Search className="h-5 w-5" />
          </Button>

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.firstName?.charAt(0)?.toUpperCase() ||
                        user.emailAddresses[0]?.emailAddress
                          .charAt(0)
                          .toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">
                      {user.fullName || user.firstName || "User"}
                    </p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleUserSettings}>
                  <User className="mr-2 h-4 w-4" />
                  User Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <a href="/sign-in">Sign In</a>
              </Button>
              <Button variant="gradient" asChild>
                <a href="/sign-up">Sign Up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
