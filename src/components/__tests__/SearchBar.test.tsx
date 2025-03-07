import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  test('calls onSearch when Enter key is pressed', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Enter username');
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });
});
