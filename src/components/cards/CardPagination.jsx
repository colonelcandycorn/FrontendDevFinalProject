import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PageNavigation } from "./PageNavigation.jsx";
import { CardGrid } from "./CardGrid.jsx";

export const CardPagination = ({ cardArray }) => {
  const cardsPerPage = 24;
  const numberOfPages = Math.ceil(cardArray.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardArray.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [cardArray]);

  return (
    <>
      <CardGrid currentCards={currentCards} />
      <PageNavigation
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
