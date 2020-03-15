import React from "react";

export const Welcome = () => {
  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body text-center">
          <h1>
            <i className="fab fa-node-js fa-3x"></i>
          </h1>
          <p>Create an account or login</p>
          <a href="register">
            <button className="btn btn-primary btn-block mb-2">Register</button>
          </a>
          <a href="login">
            <button className="btn btn-secondary btn-block">Login</button>
          </a>
        </div>
      </div>
    </div>
  );
};
