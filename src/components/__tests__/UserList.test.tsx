import { render, screen, fireEvent } from "@testing-library/react"
import UserList from "../UserList"
import type { User } from "../../types"

describe("UserList Component", () => {
  const mockUsers: User[] = [
    {
      id: 1,
      login: "user1",
      avatar_url: "https://example.com/avatar1.png",
      html_url: "https://github.com/user1",
      isExpanded: false,
    },
    {
      id: 2,
      login: "user2",
      avatar_url: "https://example.com/avatar2.png",
      html_url: "https://github.com/user2",
      isExpanded: false,
    },
  ]

  const mockOnToggleUser = jest.fn()

  beforeEach(() => {
    mockOnToggleUser.mockClear()
  })

  test("renders list of users", () => {
    render(<UserList users={mockUsers} onToggleUser={mockOnToggleUser} />)

    expect(screen.getByText("user1")).toBeInTheDocument()
    expect(screen.getByText("user2")).toBeInTheDocument()
  })

  test("calls onToggleUser when a user is clicked", () => {
    render(<UserList users={mockUsers} onToggleUser={mockOnToggleUser} />)

    const userItem = screen.getByText("user1").closest(".user-item")
    if (userItem) {
      fireEvent.click(userItem)
    }

    expect(mockOnToggleUser).toHaveBeenCalledWith(mockUsers[0].id)
  })
})

