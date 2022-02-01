import React from "react";

const Pagination = ({ productsPerPage, totalproducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalproducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination  justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item "
            style={{
              backgroundColor: "#C095F7",
              color: "white",
            }}
          >
            <a onClick={() => paginate(number)} className="page-link" style={{pointer:"cursor"}}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
