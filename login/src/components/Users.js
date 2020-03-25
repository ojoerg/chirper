import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MessagesAndErrors } from "./MessagesAndErrors";

export const Users = props => {
  const { users, getUsers, addFollow, username, togglePopup } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const follow = userToFollow => {
    addFollow(username, userToFollow);
  };

  const removePopupButton = () => {
    togglePopup(false);
    props.setPopupRemovable(true);
  };

  const hrAdder = index => {
    if (index < users.length - 1) {
      return <hr></hr>;
    }
    return;
  };

  return (
    <div
      className="card create-post my-auto"
      onMouseEnter={() => props.setPopupRemovable(false)}
      onMouseLeave={() => props.setPopupRemovable(true)}>
      <div className="card-header bg-primary pt-1 pb-0">
        <ul className="nav nav-pills card-header-pills justify-content-between align-items-center">
          <li className="nav-item">
            <h4 className="nav-link">Users</h4>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link nav-link text-danger"
              onClick={() => removePopupButton()}>
              <i className="fas fa-times-circle fa-2x"></i>
            </button>
          </li>
        </ul>
      </div>

      <MessagesAndErrors />
      <div className="card card-body">
        {users.map((user, index) => {
          if (user.username !== username) {
            return (
              <div key={user.username}>
                <div
                  className="d-flex justify-content-between align-items-center">
                  <a className="" href={"/user/" + user.username}>
                    {user.username}
                  </a>
                  <button
                    className="btn text-light bg-primary"
                    onClick={() => follow(user.username)}>
                    <i className="fas fa-plus-circle"></i> Follow
                  </button>
                </div>
                {hrAdder(index)}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};
