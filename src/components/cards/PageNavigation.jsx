export const PageNavigation = ({
  currentPage,
  handlePageClick,
  numberOfPages,
}) => {
  return (
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
  );
};
