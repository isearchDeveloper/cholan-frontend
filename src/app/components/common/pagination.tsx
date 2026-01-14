import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  queryParams = '',
}) => {
  const generatePageNumbers = () => {
    const pages: number[] = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getPageHref = (pageNum: number) => {
    return `${basePath}?page=${pageNum}${queryParams}`;
  };

  if (totalPages <= 1) return null;

  return (
    <>
     
      <div className="pagination-container mt-4 fff">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              {currentPage > 1 ? (
                <a href={getPageHref(currentPage - 1)} className="page-link" aria-label="Previous">
                  &laquo;
                </a>
              ) : (
                <span className="page-link disabled">&laquo;</span>
              )}
            </li>

            {generatePageNumbers().map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <input
                  type="radio"
                  id={`page-${page}`}
                  name="page"
                  value={page}
                  checked={currentPage === page}
                  className="visually-hidden"
                />
                <label htmlFor={`page-${page}`} className="page-link">
                  <a
                    href={getPageHref(page)}
                    className="d-block text-decoration-none"
                  >
                    {page}
                  </a>
                </label>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              {currentPage < totalPages ? (
                <a href={getPageHref(currentPage + 1)} className="page-link" aria-label="Next">
                  &raquo;
                </a>
              ) : (
                <span className="page-link disabled">&raquo;</span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;