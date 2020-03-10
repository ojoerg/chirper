import React, { useContext } from "react";
import { GlobalContext } from '../context/GlobalState';


export const Welcome = () => {
  const { changePage } = useContext(GlobalContext);

  const Click = e => {
    changePage(e.target.value);
  }

  return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body text-center">
            <h1>
              <i className="fab fa-node-js fa-3x"></i>
            </h1>
            <p>Create an account or login</p>
            <button className="btn btn-primary btn-block mb-2" value="register" onClick={Click}>
              Register
            </button>
            <button className="btn btn-secondary btn-block" value="login" onClick={Click}>
              Login
            </button>
          </div>
        </div>
      </div>
  );
};