import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import HomePage from "./page";

it("introduces Ruvro inside the main landmark", () => {
  render(<HomePage />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /curadoria privada/i, level: 1 })).toBeInTheDocument();
});
