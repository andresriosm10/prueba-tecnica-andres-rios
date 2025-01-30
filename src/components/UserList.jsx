import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Users.css"

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserList({ search }) {
  const { setSelectedUser } = useUser();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 5;

  // Obtiene los usuarios desde la API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <div className="containerView">
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="containerUsers">
          <ul>
            {paginatedUsers.map((user) => (
              <li
                key={user.id}
                className="users"
                onClick={() => setSelectedUser(user)}
              >
                <Link
                  to={`/user/${user.id}`}
                  className="user"
                >
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="containerPagination">
        <button
          className="pagination"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <button
          className="pagination"
          disabled={page * usersPerPage >= filteredUsers.length}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
