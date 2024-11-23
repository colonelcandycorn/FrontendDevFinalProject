import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { CardPagination } from "./CardPagination.jsx";
import { testCards } from "../../../setupTests";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

describe("CardPagination", () => {
  it("should render the CardPagination with CardGrid and PageNavigation components", async () => {
    render(<CardPagination cardArray={testCards} />, { wrapper: MemoryRouter });

    // should render the CardGrid component
    const cards = await screen.findAllByRole("img");
    expect(cards).toHaveLength(3);

    // should render the PageNavigation component
    const pageNavigation = screen.getByRole("button", { name: /next/i });
    expect(pageNavigation).toBeInTheDocument();
  });

  it("should render three pages if cards per page is set to 1", async () => {
    render(<CardPagination cardArray={testCards} cardsPerPage={1} />, {
      wrapper: MemoryRouter,
    });

    // should render the CardGrid component
    const cards = await screen.findAllByRole("img");
    expect(cards).toHaveLength(1);

    // should render the PageNavigation component
    const pageNavigation = screen.getByRole("button", { name: /next/i });
    expect(pageNavigation).toBeInTheDocument();

    // prev should be disabled
    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton.closest("li")).toHaveClass("disabled");

    // Query page buttons by className
    const pageItems = screen.getAllByRole("listitem");

    // Find the active page item
    const activePage = pageItems.find((item) =>
      item.classList.contains("active"),
    );
    expect(activePage).toBeInTheDocument();
    expect(activePage).toHaveTextContent("1");

    // Ensure inactive page buttons are present
    const pageTwoButton = pageItems.find(
      (item) => item.textContent.trim() === "2",
    );
    expect(pageTwoButton).toBeInTheDocument();
    expect(pageTwoButton).not.toHaveClass("active");

    const pageThreeButton = pageItems.find(
      (item) => item.textContent.trim() === "3",
    );
    expect(pageThreeButton).toBeInTheDocument();
    expect(pageThreeButton).not.toHaveClass("active");
  });

  it("should change active page when clicking next button", async () => {
    render(<CardPagination cardArray={testCards} cardsPerPage={1} />, {
      wrapper: MemoryRouter,
    });

    // should render the CardGrid component
    const cards = await screen.findAllByRole("img", { name: /Dragon/i });
    expect(cards).toHaveLength(1);

    // should render the PageNavigation component
    const pageNavigation = screen.getByRole("button", { name: /next/i });

    // Query page buttons by className
    const pageItems = screen.getAllByRole("listitem");

    // Find the active page item
    const activePage = pageItems.find((item) =>
      item.classList.contains("active"),
    );
    expect(activePage).toBeInTheDocument();
    expect(activePage).toHaveTextContent("1");

    // Ensure inactive page buttons are present
    const pageTwoButton = pageItems.find(
      (item) => item.textContent.trim() === "2",
    );
    expect(pageTwoButton).toBeInTheDocument();
    expect(pageTwoButton.closest("li")).not.toHaveClass("active");

    // Click the next button
    await userEvent.click(pageNavigation);

    // Find the active page item
    const newPageItems = screen.getAllByRole("listitem");

    const newActivePage = newPageItems.find((item) =>
      item.classList.contains("active"),
    );

    expect(newActivePage).toBeInTheDocument();
    expect(newActivePage).toHaveTextContent("2");

    const goblinCard = await screen.findAllByRole("img", { name: /Goblin/i });
    expect(goblinCard).toHaveLength(1);
  });

  it("should change active page when clicking previous button", async () => {
    render(<CardPagination cardArray={testCards} cardsPerPage={1} />, {
      wrapper: MemoryRouter,
    });

    // should render the PageNavigation component
    const pageNavigation = screen.getByRole("button", { name: /next/i });

    // Click the next button
    await userEvent.click(pageNavigation);

    const goblinCard = await screen.findAllByRole("img", { name: /Goblin/i });
    expect(goblinCard).toHaveLength(1);

    // Click the previous button
    const previousButton = screen.getByRole("button", { name: /previous/i });
    await userEvent.click(previousButton);

    // Find the active page item
    const newPageItems = screen.getAllByRole("listitem");

    const newActivePage = newPageItems.find((item) =>
      item.classList.contains("active"),
    );

    expect(newActivePage).toBeInTheDocument();
    expect(newActivePage).toHaveTextContent("1");

    const dragonCard = await screen.findAllByRole("img", { name: /Dragon/i });
    expect(dragonCard).toHaveLength(1);
  });
});
