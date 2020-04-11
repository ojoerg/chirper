import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export const HeaderProfile = () => {
  const { logoutUser } = useContext(GlobalContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-0">
      <a href="/home" className="navbar-brand pt-0 pb-0">
        <h1 className="mb-2 mt-1">
          <i className="fas fa-dove mr-2"></i>
          Chirper
        </h1>
      </a>
      <button
        className="navbar-toggler border-none"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <i className="fas fa-bars text-white fa-lg"></i>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" type="button" className="btn btn-link nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              type="button"
              className="btn btn-link nav-link"
              onClick={() => logoutUser()}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
