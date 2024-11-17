import { Col, Row } from "react-bootstrap";
import { useState } from "react";

export const CardPagination = ({ cardArray }) => {
  const cardsPerPage = 20;
  const numberOfPages = Math.ceil(cardArray.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardArray.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Row>
        <Col>
          <ul>
            {currentCards.map(({ name, scryfallId }) => (
              <li key={scryfallId}>
                <a href={`/cards/${scryfallId}`}>{name}</a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <nav aria-label="card pagination">
        <ul className="pagination">
          {/* Previous Button logic */}
          <li className="page-item">
            <a
              className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
              href="#"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {/* Page number logic */}
          {Array.from({ length: numberOfPages }, (_, i) => (
            <li key={i} className="page-item">
              <a
                className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
                href="#"
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </a>
            </li>
          ))}
          {/* Next logic */}
          <li className="page-item">
            <a
              className={`page-link ${currentPage === numberOfPages ? "disabled" : ""}`}
              href="#"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
