import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("App", () => {
  it("renders the proposal", () => {
    render(<App />);

    expect(screen.getAllByText(/Plataforma CoopBono/).length).toBeGreaterThan(0);
  });
});
