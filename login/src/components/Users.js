import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Users = props => {
  const { users, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="card create-post my-auto"
      onMouseEnter={() => props.setPopupRemovable(false)}
      onMouseLeave={() => props.setPopupRemovable(true)}>
      <h4 className="card-header bg-primary text-light">Users</h4>
      <ul className="card-body form-group">
        {users.map(user => {
          return (
            <li key={user._id}>
              <a href={"/user/" + user.username}>{user.username}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
