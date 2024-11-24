import { Pagination } from "react-bootstrap";

export const PageNavigation = ({
  currentPage,
  handlePageClick,
  numberOfPages,
}) => {
  return (
    <nav aria-label="card pagination">
      <Pagination>
        <Pagination.Prev
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => handlePageClick(currentPage - 1)}
        />
        <Pagination.Item
          active={currentPage === 1}
          onClick={() => handlePageClick(1)}
        >
          {1}
        </Pagination.Item>
        {currentPage < 5 &&
          Array.from({ length: Math.min(4, numberOfPages - 1) }).map((_, i) => (
            <Pagination.Item
              key={i + 2}
              onClick={() => handlePageClick(i + 2)}
              active={currentPage === i + 2}
            >
              {i + 2}
            </Pagination.Item>
          ))}
        {currentPage >= 5 && <Pagination.Ellipsis disabled />}
        {currentPage >= 5 &&
          Array.from({
            length: Math.min(3, numberOfPages - currentPage + 1),
          }).map((_, i) => (
            <Pagination.Item
              key={currentPage - 1 + i}
              onClick={() => handlePageClick(currentPage - 1 + i)}
              active={currentPage === currentPage - 1 + i}
            >
              {currentPage - 1 + i}
            </Pagination.Item>
          ))}
        {currentPage <= numberOfPages - 3 && numberOfPages > 5 && (
          <Pagination.Ellipsis disabled />
        )}
        {numberOfPages > 5 && (
          <Pagination.Item
            active={currentPage === numberOfPages}
            onClick={() => handlePageClick(numberOfPages)}
          >
            {numberOfPages}
          </Pagination.Item>
        )}
        <Pagination.Next
          className={currentPage === numberOfPages ? "disabled" : ""}
          onClick={() => handlePageClick(currentPage + 1)}
        />
      </Pagination>
    </nav>
  );
};
