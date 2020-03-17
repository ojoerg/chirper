import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";


export const HeaderProfile = () => {
  const { logoutUser } = useContext(GlobalContext);

  return (
    <nav className="nav navbar navbar-dark bg-primary p-0">
      <a href="/home" className="nav-link pt-0 pb-0">
        <h1 className="mb-2 mt-1">
          <i className="fas fa-dove mr-2"></i>
          Chirper
        </h1>
      </a>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link to="/home" type="button" className="btn btn-link nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" type="button" className="btn btn-link nav-link" onClick={() => logoutUser()}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};
