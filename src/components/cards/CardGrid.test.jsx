import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { logRoles, render, screen } from "@testing-library/react";
import { CardGrid } from "./CardGrid.jsx";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

describe("CardGrid", () => {
  const testCards = [
    {
      name: "Dragon",
      scryfallId: "123",
      setCode: "XYZ",
      price: 1.23,
      foilPrice: 4.56,
    },
    {
      name: "Goblin",
      scryfallId: "456",
      setCode: "XYZ",
      price: 1.23,
      foilPrice: 4.56,
    },
    {
      name: "No Image",
      scryfallId: "noImage",
      setCode: "XYZ",
      price: 1.23,
      foilPrice: 4.56,
    },
  ];

  const handlers = [
    http.get("https://api.scryfall.com/cards/noImage", () => {
      return HttpResponse.json({
        image_uris: {},
      });
    }),
    http.get("https://api.scryfall.com/cards/*", ({ request }) => {
      const cardId = request.url.split("/").pop();

      return HttpResponse.json({
        image_uris: {
          normal: `http://example.com/${cardId}`,
        },
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
