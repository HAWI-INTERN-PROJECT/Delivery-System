import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label/title for the stat
   */
  title: string;
  /**
   * The main value to display
   */
  value: string | number;
  /**
   * Optional unit/suffix to display after the value
   */
  unit?: string;
  /**
   * Optional percentage change (e.g., "+12%" or "-5%")
   */
  percentageChange?: number | string;
  /**
   * Trend direction: 'up' for positive (green), 'down' for negative (red)
   */
  trend?: "up" | "down";
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
  /**
   * Custom className for the value text
   */
  valueClassName?: string;
  /**
   * Custom className for the percentage change text
   */
  percentageClassName?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      unit,
      percentageChange,
      trend,
      icon,
      className,
      valueClassName,
      percentageClassName,
      ...props
    },
    ref,
  ) => {
    const trendColor =
      trend === "up"
        ? "text-green-600"
        : trend === "down"
          ? "text-red-600"
          : "";
    const percentageValue =
      typeof percentageChange === "number"
        ? `${percentageChange > 0 ? "+" : ""}${percentageChange}%`
        : percentageChange;

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <div className={cn("text-2xl font-bold", valueClassName)}>
              {value}
              {unit && <span className="text-sm font-normal">{unit}</span>}
            </div>
            {percentageChange !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm",
                  trendColor,
                  percentageClassName,
                )}
              >
                {trend === "up" && <TrendingUp className="h-4 w-4" />}
                {trend === "down" && <TrendingDown className="h-4 w-4" />}
                <span>{percentageValue}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);
StatCard.displayName = "StatCard";

export { StatCard };
