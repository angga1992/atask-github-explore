import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../UserList';
import { User } from '../../types';

describe('UserList Component', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      login: 'user1',
      avatar_url: 'https://example.com/avatar1.png',
      html_url: 'https://github.com/user1'
    },
    {
      id: 2,
      login: 'user2',
      avatar_url: 'https://example.com/avatar2.png',
      html_url: 'https://github.com/user2'
    }
  ];

  const mockOnSelectUser = jest.fn();

  beforeEach(() => {
    mockOnSelectUser.mockClear();
  });

  test('renders list of users', () => {
    render(<UserList users={mockUsers} onSelectUser={mockOnSelectUser} />);
    
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  test('calls onSelectUser when a user is clicked', () => {
    render(<UserList users={mockUsers} onSelectUser={mockOnSelectUser} />);
    
    const userItem = screen.getByText('user1').closest('li');
    if (userItem) {
      fireEvent.click(userItem);
    }
    
    expect(mockOnSelectUser).toHaveBeenCalledWith(mockUsers[0]);
  });
});
