import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers } from '../features/userSlice';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  // Состояние для фильтра и выбранного критерия
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        if (filterType === 'name') {
          return user.name.toLowerCase().includes(filterText.toLowerCase());
        } else if (filterType === 'username') {
          return user.username.toLowerCase().includes(filterText.toLowerCase());
        } else if (filterType === 'email') {
          return user.email.toLowerCase().includes(filterText.toLowerCase());
        } else if (filterType === 'phone') {
          return user.phone.toLowerCase().includes(filterText.toLowerCase());
        }
        return false;
      })
    );
  }, [filterText, filterType, users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="name">Filter by Name</option>
          <option value="username">Filter by Username</option>
          <option value="email">Filter by Email</option>
          <option value="phone">Filter by Phone</option>
        </select>

        <input
          type="text"
          placeholder={`Filter by ${filterType}`}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="table-container">
        <h1>User Management</h1>
        {filteredUsers.length === 0 ? (
          <p className="table-container-p">No users found...ヽ(°□° )ノ</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserTable;
