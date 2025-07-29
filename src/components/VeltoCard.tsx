import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { VeltoCardProps } from "@/types";

export const VeltoCard = ({
  className,
  children,
  title,
  description,
  hover = true,
  onClick,
}: VeltoCardProps) => {
  return (
    <Card
      className={cn(
        "velto-card border-0 rounded-2xl overflow-hidden",
        hover && "hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
        "transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && (
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={title || description ? "pt-0" : "p-6"}>
        {children}
      </CardContent>
    </Card>
  );
};
