import { useEffect, useState } from "react";
import { PageNavigation } from "./PageNavigation.jsx";
import { CardGrid } from "./CardGrid.jsx";

export const CardPagination = ({ cardArray }) => {
  const cardsPerPage = 24;
  const numberOfPages = Math.ceil(cardArray.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCards, setCurrentCards] = useState([]);

  useEffect(() => {
    const indexOfLastCard = cardsPerPage;
    const indexOfFirstCard = 0;
    setCurrentPage(1);
    setCurrentCards(cardArray.slice(indexOfFirstCard, indexOfLastCard));
  }, [cardArray]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentCards(cardArray.slice(indexOfFirstCard, indexOfLastCard));
  };

  useEffect(() => {
    console.log("Current Page:", currentPage);
    console.log("Current Cards:", currentCards);
  }, [currentPage, currentCards]);

  return (
    <>
      <CardGrid currentCards={[...currentCards]} />
      <PageNavigation
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
