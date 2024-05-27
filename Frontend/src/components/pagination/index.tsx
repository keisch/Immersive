import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface IProps {
  pagination: IPagination;
}

const ListPagination = ({ pagination }: IProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      pagination.onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${
            pagination.currentPage === i ? "current-page" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className="pagination-button"
        aria-label="Previous button"
      >
        <FontAwesomeIcon icon={faChevronLeft} color="white" />
      </button>
      <div className="page-numbers">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className="pagination-button"
        aria-label="Next button"
      >
        <FontAwesomeIcon icon={faChevronRight} color="white" />
      </button>
    </div>
  );
};

export default ListPagination;
