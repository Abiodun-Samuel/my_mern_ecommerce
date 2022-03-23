import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item  ${page === 1 && "disabled"} `}>
            <Link
              className="page-link"
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
                  : `/admin/products/${page - 1}`
              }
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page && "active"} `}
              aria-current="page"
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/products/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
          <li className={`page-item  ${page === pages && "disabled"} `}>
            <Link
              className="page-link"
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page + 1}`
                    : `/page/${page + 1}`
                  : `/admin/products/${page + 1}`
              }
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    )

    //     <li class="page-item"><a class="page-link" href="#">1</a></li>
    //     <li class="page-item"><a class="page-link" href="#">2</a></li>
    //     <li class="page-item"><a class="page-link" href="#">3</a></li>
    //     <li class="page-item">
    //       <a class="page-link" href="#" aria-label="Next">
    //         <span aria-hidden="true">&raquo;</span>
    //       </a>
    //     </li>
    /* pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/products/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    ) */
  );
};

export default Paginate;
