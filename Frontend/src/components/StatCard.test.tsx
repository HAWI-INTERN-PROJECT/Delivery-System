import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "./StatCard";
import { TrendingUp } from "lucide-react";

describe("StatCard", () => {
  it("renders title and value", () => {
    render(<StatCard title="Today's Orders" value={28} />);
    expect(screen.getByText("Today's Orders")).toBeInTheDocument();
    expect(screen.getByText("28")).toBeInTheDocument();
  });

  it("renders unit when provided", () => {
    render(<StatCard title="Revenue" value={8740} unit="ETB" />);
    expect(screen.getByText("ETB")).toBeInTheDocument();
  });

  it("renders percentage change", () => {
    render(
      <StatCard
        title="Today's Orders"
        value={28}
        percentageChange={12}
        trend="up"
      />,
    );
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("renders with negative percentage change", () => {
    render(
      <StatCard title="Orders" value={15} percentageChange={-5} trend="down" />,
    );
    expect(screen.getByText("-5%")).toBeInTheDocument();
  });

  it("renders string percentage change", () => {
    render(<StatCard title="Active Orders" value={3} percentageChange="+8%" />);
    expect(screen.getByText("+8%")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <StatCard
        title="Trend"
        value={100}
        icon={<TrendingUp data-testid="trend-icon" />}
      />,
    );
    expect(screen.getByTestId("trend-icon")).toBeInTheDocument();
  });

  it("applies custom classNames", () => {
    const { container } = render(
      <StatCard title="Test" value={42} className="custom-card-class" />,
    );
    expect(container.querySelector(".custom-card-class")).toBeInTheDocument();
  });

  it("has correct title styling", () => {
    render(<StatCard title="Test Card" value={100} />);
    const title = screen.getByText("Test Card");
    expect(title).toHaveClass("text-sm");
    expect(title).toHaveClass("font-medium");
    expect(title).toHaveClass("text-muted-foreground");
  });

  it("has correct value styling", () => {
    render(<StatCard title="Test" value={100} />);
    const value = screen.getByText("100");
    expect(value).toHaveClass("text-2xl");
    expect(value).toHaveClass("font-bold");
  });
});
