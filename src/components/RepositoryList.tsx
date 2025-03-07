import { useState } from 'react';
import { Repository } from '../types';
import { Star } from './Icons';

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(5);
  
  // Calculate total pages
  const totalPages = Math.ceil(repositories.length / reposPerPage);
  
  // Get current page repositories
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);
  
  
  // Go to first page
  const firstPage = () => {
    setCurrentPage(1);
  };
  
  // Go to last page
  const lastPage = () => {
    setCurrentPage(totalPages);
  };
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle repos per page change
  const handleReposPerPageChange = (perPage: number) => {
    setReposPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="repository-container">
      {repositories.length > 0 && (
        <div className="repository-header-controls">
          <span className="repository-count">{repositories.length} repositories</span>
          <div className="results-per-page">
            <label htmlFor="repos-per-page">Repos per page:</label>
            <select 
              id="repos-per-page" 
              value={reposPerPage}
              onChange={(e) => handleReposPerPageChange(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}
      
      <ul className="repository-list">
        {currentRepos.map((repo) => (
          <li key={repo.id} className="repository-item">
            <div className="repository-header">
              <h3 className="repository-title">{repo.name}</h3>
              <div className="repository-stars">
                {repo.stargazers_count}
                <Star />
              </div>
            </div>
            {repo.description && (
              <p className="repository-description">{repo.description}</p>
            )}
          </li>
        ))}
      </ul>
      
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-actions">
            <button 
              onClick={firstPage} 
              disabled={currentPage === 1}
              className="pagination-button first-page"
              title="First Page"
            >
              First
            </button>
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className="pagination-button"
              title="Previous Page"
            >
              Previous
            </button>
          </div>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="pagination-actions">
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className="pagination-button"
              title="Next Page"
            >
              Next
            </button>
            <button 
              onClick={lastPage} 
              disabled={currentPage === totalPages}
              className="pagination-button last-page"
              title="Last Page"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryList;
