import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers } from '../features/userSlice';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const [nameFilter, setNameFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Фильтрация по каждому полю
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
       
      )
    );
  }, [nameFilter, usernameFilter, emailFilter, phoneFilter, users]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <div className="container">
    <div className="filters">
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by username"
        value={usernameFilter}
        onChange={(e) => setUsernameFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by email"
        value={emailFilter}
        onChange={(e) => setEmailFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by phone"
        value={phoneFilter}
        onChange={(e) => setPhoneFilter(e.target.value)}
      />
    </div>
    <div className="table-container">
      <h1>User Management</h1>
      {filteredUsers.length === 0 ? (
          <p className="table-container-p">
            No users found...ヽ(°□° )ノ</p>
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
);};

export default UserTable;