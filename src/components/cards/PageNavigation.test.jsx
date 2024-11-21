import { render, screen, fireEvent, logRoles } from "@testing-library/react";
import { PageNavigation } from "./PageNavigation.jsx";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, jest } from "@jest/globals";

const mocks = [];

const TestProvider = ({ children }) => (
  <MockedProvider mocks={[]} addTypename={false}>
    <MemoryRouter>{children}</MemoryRouter>
  </MockedProvider>
);

describe("PageNavigation", () => {
  it("should always render first and last page and prev and next", () => {
    render(
      <PageNavigation
        currentPage={1}
        handlePageClick={jest.fn()}
        numberOfPages={5}
      />,
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    const firstButton = screen.getByText(/1/);
    expect(firstButton).toBeInTheDocument();
    expect(firstButton.closest("li")).toHaveClass("active");

    const lastButton = screen.getByRole("button", { name: /2/ });
    expect(lastButton).toBeInTheDocument();
  });

  it("should always mark the current page as active", () => {
    render(
      <PageNavigation
        currentPage={20}
        handlePageClick={jest.fn()}
        numberOfPages={30}
      />,
    );

    const activeButton = screen.getByText(/20/);
    expect(activeButton.closest("li")).toHaveClass("active");
  });

  it("should always mark previous as disabled on first page", () => {
    render(
      <PageNavigation
        currentPage={1}
        handlePageClick={jest.fn()}
        numberOfPages={5}
      />,
    );

    const previous = screen.getByRole("button", { name: /previous/i });
    expect(previous.closest("li")).toHaveClass("disabled");
  });

  it("should always mark next as disabled on last page", () => {
    render(
      <PageNavigation
        currentPage={5}
        handlePageClick={jest.fn()}
        numberOfPages={5}
      />,
    );

    const next = screen.getByRole("button", { name: /next/i });
    expect(next.closest("li")).toHaveClass("disabled");
  });

  it("should always render at least one ellipsis if there are more than 5 pages", () => {
    render(
      <PageNavigation
        currentPage={1}
        handlePageClick={jest.fn()}
        numberOfPages={7}
      />,
    );

    //7 pages so previous  + 1 + 2 + 3 + 4 + 5 + ellipsis + 7 + next = 9 li elements
    const liElements = screen.getAllByRole("listitem");
    expect(liElements).toHaveLength(9);
  });

  it("should render two ellipsis if the current page is greater than 5 and less than the number of pages - 3", () => {
    render(
      <PageNavigation
        currentPage={6}
        handlePageClick={jest.fn()}
        numberOfPages={10}
      />,
    );

    //7 pages so previous + 1 + ... + 5 + 6 + 7 + ... + 10 + next = 8 li elements
    const liElements = screen.getAllByRole("listitem");
    expect(liElements).toHaveLength(9);

    // should have 5, 6, 7 with 6 as active
    const activeButton = screen.getByText(/6/);
    expect(activeButton.closest("li")).toHaveClass("active");

    const fiveButton = screen.getByText(/5/);
    expect(fiveButton).toBeInTheDocument();

    const sevenButton = screen.getByText(/7/);
    expect(sevenButton).toBeInTheDocument();

    // 4 and 8 should not be present
    const fourButton = screen.queryByText(/4/);
    expect(fourButton).toBeNull();

    const eightButton = screen.queryByText(/8/);
    expect(eightButton).toBeNull();
  });

  it("should render only the pages, previous, and next if there are less than 5 pages", () => {
    render(
      <PageNavigation
        currentPage={1}
        handlePageClick={jest.fn()}
        numberOfPages={3}
      />,
    );

    //3 pages so previous + 1 + 2 + 3 + next = 5 li elements
    const liElements = screen.getAllByRole("listitem");
    expect(liElements).toHaveLength(5);
  });

  it("should call handlePageClick with the correct page number when a page is clicked", () => {
    const handlePageClick = jest.fn();
    render(
      <PageNavigation
        currentPage={1}
        handlePageClick={handlePageClick}
        numberOfPages={5}
      />,
    );

    const pageTwo = screen.getByText(/2/);
    fireEvent.click(pageTwo);
    expect(handlePageClick).toHaveBeenCalledWith(2);
  });

  it("should decrement the current page by 1 when previous is clicked", () => {
    const handlePageClick = jest.fn();
    render(
      <PageNavigation
        currentPage={2}
        handlePageClick={handlePageClick}
        numberOfPages={5}
      />,
    );

    const previous = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(previous);
    expect(handlePageClick).toHaveBeenCalledWith(1);
  });

  it("should increment the current page by 1 when next is clicked", () => {
    const handlePageClick = jest.fn();
    render(
      <PageNavigation
        currentPage={2}
        handlePageClick={handlePageClick}
        numberOfPages={5}
      />,
    );

    const next = screen.getByRole("button", { name: /next/i });
    fireEvent.click(next);
    expect(handlePageClick).toHaveBeenCalledWith(3);
  });
});
