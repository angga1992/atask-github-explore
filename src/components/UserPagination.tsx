interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserPagination = ({ currentPage, totalPages, onPageChange }: UserPaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    
    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(1);
      // Add ellipsis if needed
      if (currentPage > 4) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
    }
    
    // Show pages around current page
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      // Add ellipsis if needed
      if (currentPage < totalPages - 3) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="user-pagination">
      <div className="pagination-actions">
        <button 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1}
          className="pagination-button first-page"
          title="First Page"
        >
          First
        </button>
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
          title="Previous Page"
        >
          Previous
        </button>
      </div>
      
      <div className="pagination-pages">
        {getPageNumbers().map((page, index) => 
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
          ) : (
            <button 
              key={page}
              onClick={() => onPageChange(page)}
              className={`pagination-page-button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          )
        )}
      </div>
      
      <div className="pagination-actions">
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
          title="Next Page"
        >
          Next
        </button>
        <button 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages}
          className="pagination-button last-page"
          title="Last Page"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default UserPagination;
