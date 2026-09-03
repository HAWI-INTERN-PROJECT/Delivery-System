import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

describe("Tabs", () => {
  it("renders tab list and content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("renders active tab content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab1 = screen.getByText("Content 1");
    expect(tab1).toBeInTheDocument();
  });

  it("applies TabsList and TabsTrigger styling", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );

    const trigger = screen.getByText("Tab 1");
    expect(trigger).toHaveClass("inline-flex");
    expect(trigger).toHaveClass("items-center");
  });

  it("renders multiple tabs correctly", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">New Orders</TabsTrigger>
          <TabsTrigger value="tab2">Preparing</TabsTrigger>
          <TabsTrigger value="tab3">Ready</TabsTrigger>
          <TabsTrigger value="tab4">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">New Orders Content</TabsContent>
        <TabsContent value="tab2">Preparing Content</TabsContent>
        <TabsContent value="tab3">Ready Content</TabsContent>
        <TabsContent value="tab4">Delivered Content</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("New Orders")).toBeInTheDocument();
    expect(screen.getByText("Preparing")).toBeInTheDocument();
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });
});
