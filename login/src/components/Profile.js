import React, { useContext, useState, useEffect, useRef } from "react";
import { HeaderProfile } from "./HeaderProfile";
import { GlobalContext } from "../context/GlobalState";
import { MessagesAndErrors } from "./MessagesAndErrors";

export const Profile = () => {
  const {
    username,
    changeUserProperty,
    getUser,
    user,
    clearMessages,
    clearErrors,
    filePath,
    getFile,
    uploadFile
  } = useContext(GlobalContext);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePassword2, setDeletePassword2] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const profilePictureRef = useRef(null);

  useEffect(() => {
    clearMessages();
    clearErrors();
    getUser(username);
    getFile("profilePicture", username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  const onSubmit = type => e => {
    e.preventDefault();
    let text = "",
      password = "",
      password2 = "",
      dataToChange = {};

    switch (type) {
      case "firstname":
        text = newFirstname;
        break;
      case "lastname":
        text = newLastname;
        break;
      case "email":
        text = newEmail;
        break;
      case "username":
        text = newUsername;
        break;
      case "password":
        password = newPassword;
        password2 = newPassword2;
        break;
      case "delete":
        password = deletePassword;
        password2 = deletePassword2;
        break;

      default:
        return;
    }

    if (type === "password" || type === "delete") {
      dataToChange = {
        type: type,
        password: password,
        password2: password2,
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
    setNewFirstname("");
    setNewLastname("");
    setNewEmail("");
    setNewUsername("");
    setNewPassword("");
    setNewPassword2("");
    setDeletePassword("");
    setDeletePassword2("");
    clearMessages();
    clearErrors();
  };

  const profilePictureUpload = e => {
    e.preventDefault();

    let imageFormData = new FormData();
    imageFormData.append("username", username);
    imageFormData.append("type", "profilePicture");
    imageFormData.append("oldFile", filePath);
    imageFormData.append("profilePicture", profilePicture);

    clearMessages();
    clearErrors();
    uploadFile(imageFormData);
  };

  const simulateClickOnProfilePictureInput = () => {
    profilePictureRef.current.click();
  }

  return (
    <>
      <HeaderProfile />
      <div className="row mt-5 mx-auto">
        <div className="card col-md-6 m-auto pl-0 pr-0">
          <div className="bg-primary text-light card-header">
            <h1 className="text-center mb-1">
              Profil of {user.username} ({user.firstname} {user.lastname})
            </h1>
          </div>
          <MessagesAndErrors />
          <div className="card-body">
            <div className="ml-3 mb-2">Current profile picture</div>

            <form onSubmit={profilePictureUpload}>
              <img
                src={"http://localhost:5000" + filePath}
                alt="profile img"
                className="img-thumbnail col-md-5 ml-3 mb-2 profile-picture"
                onClick={() => simulateClickOnProfilePictureInput()}
              />
              <div className="ml-3 mb-2">Upload your profile picture</div>
              <div className="form-group input-group col-md-10">
                <div className="custom-file">
                  <label className="custom-file-label" htmlFor="profilePicture">
                    Choose file
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    className="custom-file-input"
                    placeholder="Choose file"
                    files={profilePicture}
                    onChange={e => setProfilePicture(e.target.files[0])}
                    ref={profilePictureRef}
                  />

                  <div className="input-group-append">
                    <a href="profile">
                      <button type="submit" className="btn btn-primary">
                        Upload
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </form>
            <hr />
            <form onSubmit={onSubmit("firstname")}>
              <div className="form-group col-md-10">
                <label htmlFor="newFirstname">Current Firstname: {user.firstname}</label>
                <input
                  type="text"
                  id="newFirstname"
                  name="newFirstname"
                  className="form-control"
                  placeholder="Enter new Firstname"
                  value={newFirstname}
                  onChange={e => setNewFirstname(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change Firstname
                </button>
              </a>
            </form>
            <hr />
            <form onSubmit={onSubmit("lastname")}>
              <div className="form-group col-md-10">
                <label htmlFor="newLastname">Current Lastname: {user.lastname}</label>
                <input
                  type="text"
                  id="newLastname"
                  name="newLastname"
                  className="form-control"
                  placeholder="Enter new Lastname"
                  value={newLastname}
                  onChange={e => setNewLastname(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-primary ml-3">
                  Change Lastname
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
            <form onSubmit={onSubmit("delete")}>
              <div className="form-group col-md-10">
                <label htmlFor="deletePassword">
                  Please type your current password to delete your user:
                </label>
                <input
                  type="password"
                  id="deletePassword"
                  name="deletePassword"
                  className="form-control"
                  placeholder="Enter Password"
                  value={deletePassword}
                  onChange={e => setDeletePassword(e.target.value)}
                />
                <input
                  type="password"
                  id="deletePassword2"
                  name="deletePassword2"
                  className="form-control mt-3"
                  placeholder="Enter new Password again"
                  value={deletePassword2}
                  onChange={e => setDeletePassword2(e.target.value)}
                />
              </div>
              <a href="profile">
                <button type="submit" className="btn btn-danger ml-3">
                  Delete User
                </button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
