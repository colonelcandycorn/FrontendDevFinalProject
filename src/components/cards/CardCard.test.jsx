import { render, screen, fireEvent, logRoles } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import { CardCard } from "./CardCard.jsx";

describe("CardCard", () => {
  const testCard = {
    name: "Dragon",
    scryfallId: "123",
    uri: "http://example.com",
    setCode: "XYZ",
    price: 1.23,
    foilPrice: 4.56,
  };

  it("should render the CardCard component", () => {
    render(<CardCard {...testCard} />);

    // should render the prices
    expect(screen.getByText(/Normal: \$1.23/i)).toBeInTheDocument();
    expect(screen.getByText(/Foil: \$4.56/)).toBeInTheDocument();

    // should render the image
    expect(screen.getByRole("img")).toHaveAttribute("src", testCard.uri);

    // should have alt text
    expect(
      screen.getByRole("img", { name: testCard.name }),
    ).toBeInTheDocument();

    // should render the name
    expect(screen.getByText(testCard.name)).toBeInTheDocument();

    // should render a link to /cards/:scryfallId
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/cards/${testCard.scryfallId}`,
    );
  });

  it("should render Not Available when price is 0", () => {
    const cardWithZeroPrice = { ...testCard, price: 0, foilPrice: 0 };
    render(<CardCard {...cardWithZeroPrice} />);

    expect(screen.getByText(/Normal: Not Available/i)).toBeInTheDocument();
    expect(screen.getByText(/Foil: Not Available/i)).toBeInTheDocument();
  });
});
