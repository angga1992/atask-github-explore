"use client"

import type { User } from "../types"
import { ChevronDown } from "./Icons"
import RepositoryList from "./RepositoryList"

interface UserListProps {
  users: User[]
  onToggleUser: (userId: number) => void
}

const UserList = ({ users, onToggleUser }: UserListProps) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item-container">
          <div className="user-item" onClick={() => onToggleUser(user.id)}>
            <span className="user-login">{user.login}</span>
            <ChevronDown className={user.isExpanded ? "chevron-expanded" : ""} />
          </div>

          {user.isExpanded && user.repositories && (
            <div className="user-repositories">
              {user.repositories.length > 0 ? (
                <RepositoryList repositories={user.repositories} />
              ) : (
                <p className="no-repos-message">No repositories found</p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default UserList

