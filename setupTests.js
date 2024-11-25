// setupTests.js
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "@jest/globals";

export const testCards = [
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
