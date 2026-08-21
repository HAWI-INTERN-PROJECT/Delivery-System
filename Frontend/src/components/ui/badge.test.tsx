import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Pending</Badge>);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-slate-100");
    expect(badge).toHaveClass("text-slate-800");
  });

  it("applies pending variant", () => {
    render(<Badge variant="pending">Pending</Badge>);
    const badge = screen.getByText("Pending");
    expect(badge).toHaveClass("bg-orange-100");
    expect(badge).toHaveClass("text-orange-800");
  });

  it("applies preparing variant", () => {
    render(<Badge variant="preparing">Preparing</Badge>);
    const badge = screen.getByText("Preparing");
    expect(badge).toHaveClass("bg-orange-100");
    expect(badge).toHaveClass("text-orange-800");
  });

  it("applies ready variant", () => {
    render(<Badge variant="ready">Ready for Pickup</Badge>);
    const badge = screen.getByText("Ready for Pickup");
    expect(badge).toHaveClass("bg-orange-100");
    expect(badge).toHaveClass("text-orange-800");
  });

  it("applies delivered variant", () => {
    render(<Badge variant="delivered">Delivered</Badge>);
    const badge = screen.getByText("Delivered");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("applies approved variant", () => {
    render(<Badge variant="approved">Approved</Badge>);
    const badge = screen.getByText("Approved");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("applies success variant", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("applies warning variant", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");
  });

  it("applies error variant", () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText("Error");
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });
});
