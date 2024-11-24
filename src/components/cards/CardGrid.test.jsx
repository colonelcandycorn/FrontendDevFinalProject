import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { CardGrid } from "./CardGrid.jsx";
import { MemoryRouter } from "react-router-dom";
import { testCards } from "../../../setupTests";

describe("CardGrid", () => {
  it("should render the CardGrid component", async () => {
    render(<CardGrid currentCards={testCards} />, { wrapper: MemoryRouter });

    // should render cards after a delay
    const cards = await screen.findAllByRole("img");
    expect(cards).toHaveLength(3);

    // should render dragon and goblin
    expect(screen.getByText(/Dragon/i)).toBeInTheDocument();
    expect(screen.getByText(/Goblin/i)).toBeInTheDocument();

    // get the link to the no image card and prove it is to placeholder
    const noImageCard = screen.getByRole("img", { name: /No Image/i });
    expect(noImageCard).toHaveAttribute("src", "https://placehold.co/326x453");
  });
});
