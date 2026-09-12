import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CatalogWatch360 } from "./CatalogWatch360";

const frames = ["/1.webp", "/2.webp", "/3.webp", "/4.webp"];

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
}

describe("CatalogWatch360", () => {
  beforeEach(() => setReducedMotion(false));
  afterEach(() => { cleanup(); vi.useRealTimers(); });

  it("moves through frames with controls and keyboard arrows", () => {
    render(<CatalogWatch360 frames={frames} name="Relógio teste" alt="Relógio teste em vários ângulos" />);
    const viewer = screen.getByRole("region", { name: /visualização 360/i });
    expect(screen.getByText("01 / 04")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /próximo ângulo/i }));
    expect(screen.getByText("02 / 04")).toBeInTheDocument();
    fireEvent.keyDown(viewer, { key: "ArrowLeft" });
    expect(screen.getByText("01 / 04")).toBeInTheDocument();
  });

  it("does not autoplay when reduced motion is requested", () => {
    vi.useFakeTimers();
    setReducedMotion(true);
    render(<CatalogWatch360 frames={frames} name="Relógio teste" alt="Relógio teste em vários ângulos" />);
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByText("01 / 04")).toBeInTheDocument();
  });

  it("autorotates at the same cadence as the home reference", () => {
    vi.useFakeTimers();
    render(<CatalogWatch360 frames={frames} name="Relógio teste" alt="Relógio teste em vários ângulos" />);
    const viewer = screen.getByRole("region", { name: /visualização 360/i });
    expect(viewer).toHaveAttribute("data-autorotate", "running");
    act(() => vi.advanceTimersByTime(1_150));
    expect(screen.getByText("02 / 04")).toBeInTheDocument();
  });
});
