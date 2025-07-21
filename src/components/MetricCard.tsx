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
        return "bg-gradient-primary shadow-glow border-primary/20";
      case "accent":
        return "bg-gradient-accent shadow-glow border-accent/20";
      default:
        return "bg-gradient-card shadow-card border-border";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-105 hover:shadow-glow",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-accent">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};