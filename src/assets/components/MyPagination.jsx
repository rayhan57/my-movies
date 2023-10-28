import React from "react";
import { Pagination } from "react-bootstrap";

const MyPagination = ({ activePage, setActivePage, totalPages }) => {
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const displayPagination = 5;

  let startPage = Math.max(activePage - Math.floor(displayPagination / 2), 1);
  let endPage = Math.min(startPage + displayPagination - 1, totalPages);

  const paginationItems = [];

  for (let page = startPage; page <= endPage; page++) {
    paginationItems.push(
      <Pagination.Item
        className="mx-1"
        key={page}
        active={page === activePage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.Prev
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};

export default MyPagination;
