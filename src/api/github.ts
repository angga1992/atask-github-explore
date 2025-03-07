import { User, Repository } from '../types';

const GITHUB_API_URL = 'https://api.github.com';
const DEFAULT_USERS_PER_PAGE = 5;

export async function searchUsers(
  query: string, 
  page: number = 1, 
  perPage: number = DEFAULT_USERS_PER_PAGE
): Promise<{ users: User[], totalCount: number }> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return { 
      users: data.items,
      totalCount: data.total_count
    };
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

export async function getUserRepositories(username: string): Promise<Repository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

export async function searchUsersWithRepos(
  query: string,
  page: number = 1,
  perPage: number = DEFAULT_USERS_PER_PAGE
): Promise<{ users: User[], totalCount: number }> {
  try {
    // First, search for users
    const { users, totalCount } = await searchUsers(query, page, perPage);
    
    // Then, fetch repositories for each user in parallel
    const usersWithRepos = await Promise.all(
      users.map(async (user) => {
        try {
          const repositories = await getUserRepositories(user.login);
          return { ...user, repositories, isExpanded: false };
        } catch (error) {
          console.error(`Error fetching repositories for ${user.login}:`, error);
          return { ...user, repositories: [], isExpanded: false };
        }
      })
    );
    
    return { users: usersWithRepos, totalCount };
  } catch (error) {
    console.error('Error searching users with repositories:', error);
    throw error;
  }
}
