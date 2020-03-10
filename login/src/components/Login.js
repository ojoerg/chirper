import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, changePage } = useContext(GlobalContext);

  const Click = e => {
    changePage(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      username: username,
      password: password
    };

    loginUser(user);
  };

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-sign-in-alt"></i> Login
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <p className="lead mt-4">
            No Account? <button className="btn btn-secondary" value="register" onClick={Click}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};