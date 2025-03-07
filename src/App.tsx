import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import UserPagination from './components/UserPagination';
import { User } from './types';
import { searchUsersWithRepos } from './api/github';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a username to search');
      return;
    }

    setSearchQuery(query);
    setError(null);
    setIsLoading(true);
    setUsers([]);
    setCurrentPage(1);

    try {
      const { users: fetchedUsers, totalCount } = await searchUsersWithRepos(query, 1, usersPerPage);
      setUsers(fetchedUsers);
      setTotalUsers(totalCount);
      
      if (fetchedUsers.length === 0) {
        setError('No users found matching your search');
      }
    } catch (err) {
      setError('Error searching for users. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { users: fetchedUsers } = await searchUsersWithRepos(searchQuery, page, usersPerPage);
      setUsers(fetchedUsers);
      setCurrentPage(page);
      
      if (fetchedUsers.length === 0) {
        setError('No users found on this page');
      }
    } catch (err) {
      setError('Error fetching users. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUser = (userId: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isExpanded: !user.isExpanded } 
          : user
      )
    );
  };

  const handleUsersPerPageChange = (perPage: number) => {
    setUsersPerPage(perPage);
    // Reset to page 1 when changing items per page
    setCurrentPage(1);
    
    if (searchQuery) {
      // Reload with new per page setting
      handleSearch(searchQuery);
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="app-container">
      <h1>GitHub User Explorer</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && <ErrorMessage message={error} />}
      
      {isLoading ? (
        <LoadingSpinner message="Searching users and repositories..." />
      ) : (
        users.length > 0 && (
          <>
            <div className="results-header">
              <p className="results-text">Showing users for "{searchQuery}"</p>
              <div className="results-per-page">
                <label htmlFor="users-per-page">Users per page:</label>
                <select 
                  id="users-per-page" 
                  value={usersPerPage}
                  onChange={(e) => handleUsersPerPageChange(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            
            <UserList users={users} onToggleUser={handleToggleUser} />
            
            {totalPages > 1 && (
              <UserPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )
      )}
    </div>
  );
}

export default App;
