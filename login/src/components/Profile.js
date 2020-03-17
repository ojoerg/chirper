import React, { useContext, useState, useEffect } from "react";
import { HeaderProfile } from "./HeaderProfile";
import { GlobalContext } from "../context/GlobalState";

export const Profile = () => {
  const { username, changeUserProperty, getUser, user } = useContext(GlobalContext);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    getUser(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  const onSubmit = type => e => {
    //e.preventDefault();
    let text = "",
      text2 = "",
      dataToChange = {};

    switch (type) {
      case "name":
        text = newName;
        break;
      case "email":
        text = newEmail;
        break;
      case "password":
        text = newPassword;
        text2 = newPassword2;
        break;
      case "username":
        text = newUsername;
        break;
      default:
        return;
    }

    if (type === "password") {
      dataToChange = {
        type: type,
        text: [text, text2],
        username: username
      };
    } else {
      dataToChange = {
        type: type,
        text: text,
        username: username
      };
    }

    changeUserProperty(dataToChange);
  };

  return (
    <>
      <HeaderProfile />
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">Profil of {username}</h1>
            <form onSubmit={onSubmit("name")}>
              <div className="form-group col-md-10">
                <label htmlFor="newName">Current Name: {user.name}</label>
                <input
                  type="text"
                  id="newName"
                  name="newName"
                  className="form-control"
                  placeholder="Enter new Name"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change Name
                </button>
              </a>
            </form>
            <hr />
            <form onSubmit={onSubmit("email")}>
              <div className="form-group col-md-10">
                <label htmlFor="newEmail">Current E-Mail: {user.email}</label>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  className="form-control"
                  placeholder="Enter new E-Mail"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change E-Mail
                </button>
              </a>
            </form>
            <hr />
            <form onSubmit={onSubmit("password")}>
              <div className="form-group col-md-10">
                <label htmlFor="newPassword">Current Password: hidden</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter new Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword2"
                  className="form-control mt-3"
                  placeholder="Enter new Password again"
                  value={newPassword2}
                  onChange={e => setNewPassword2(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change Password
                </button>
              </a>
            </form>
            <hr />
            <form onSubmit={onSubmit("username")}>
              <div className="form-group col-md-10">
                <label htmlFor="newUsername">Current Username: {username}</label>
                <input
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  className="form-control"
                  placeholder="Enter new Username"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change Username
                </button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
