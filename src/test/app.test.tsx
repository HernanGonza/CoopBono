import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("App", () => {
  it("renders the proposal", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/CoopBono 2027/);
    expect(screen.getAllByText("hola@tacuara.com.ar").length).toBeGreaterThan(0);
  });
});
