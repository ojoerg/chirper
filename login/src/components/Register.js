import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MessagesAndErrors } from "./MessagesAndErrors";

export const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser, clearMessages, clearErrors } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      password2: password2,
    };

    clearMessages();
    clearErrors();
    registerUser(newUser);
  };

  return (
    <div className="row mt-5">
      <div className="mx-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-user-plus"></i> Register
          </h1>
          <MessagesAndErrors />
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="form-control"
                placeholder="Enter Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="form-control"
                placeholder="Enter Lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                name="password2"
                className="form-control"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
          <p className="lead mt-4">
            Have An Account? <a href="login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
