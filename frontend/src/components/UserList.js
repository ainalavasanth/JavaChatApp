import React from "react";

function UserList({ users }) {
  return (
    <div className="user-list">
      <h3>Users</h3>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
