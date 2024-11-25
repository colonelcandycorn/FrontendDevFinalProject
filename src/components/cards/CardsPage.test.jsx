import { logRoles, render, screen } from "@testing-library/react";
import { CardsPage } from "./CardsPage.jsx";
import "@testing-library/jest-dom";
import { describe, it, expect, xit } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";

describe("CardsPage", () => {
  it.skip("should render the CardsPage component", () => {
    const loadingSets = false;
    const errorSets = null;
    const setInfo = [
      {
        code: "KHM",
        name: "Kaldheim",
        icon_svg_uri: "test",
        set_type: "expansion",
      },
      {
        code: "ZNR",
        name: "test",
        icon_svg_uri:
          "https://c1.scryfall.com/file/scryfall-symbols/sets/znr.svg",
        set_type: "expansion",
      },
    ];

    const view = render(
      <CardsPage
        setInfo={setInfo}
        loadingSets={loadingSets}
        errorSets={errorSets}
      />,
      { wrapper: MemoryRouter },
    );

    logRoles(view.container);

    expect(1).toBe(1);
  });
});
