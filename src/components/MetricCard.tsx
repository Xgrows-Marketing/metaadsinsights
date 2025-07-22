import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  description,
  icon,
  variant = "default",
  className
}: MetricCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-primary text-primary-foreground shadow-glow border-primary/20";
      case "accent":
        return "bg-gradient-accent text-accent-foreground shadow-glow border-accent/20";
      default:
        return "bg-card text-card-foreground shadow-card border-border";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-105 hover:shadow-elevated",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant === "default" ? "text-muted-foreground" : "text-current opacity-80"
        )}>
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "text-current",
            variant === "default" && "text-accent"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">
          {value}
        </div>
        {description && (
          <p className={cn(
            "text-xs",
            variant === "default" ? "text-muted-foreground" : "text-current opacity-70"
          )}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};