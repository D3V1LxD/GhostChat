import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/components/AnimatedTagline", () => ({
  AnimatedTagline: ({ text }: { text: string }) => <div>{text}</div>,
}));

vi.mock("@/components/CyclingFeatures", () => ({
  CyclingFeatures: () => <div>Features</div>,
}));

describe("Home page social/tutorial links", () => {
  it("does not render removed social/tutorial links", () => {
    render(<Home />);

    expect(screen.queryByRole("link", { name: /watch tutorial/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /how to use/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="twitter.com/intent/tweet"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="reddit.com/submit"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="linkedin.com/sharing"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="youtube.com/watch"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="github.com/Teycir/GhostChat#readme"]')).not.toBeInTheDocument();
  });
});
