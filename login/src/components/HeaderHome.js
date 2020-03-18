import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Popup } from "./Popup";
import { Link } from "react-router-dom";

export const HeaderHome = () => {
  const { togglePopup, popup, logoutUser, toggleAllPosts, allPosts } = useContext(GlobalContext);

  return (
    <nav className="nav navbar navbar-dark bg-primary p-0">
      <a href="/home" className="nav-link pt-0 pb-0">
        <h1 className="mb-2 mt-1">
          <i className="fas fa-dove mr-2"></i>
          Chirper
        </h1>
      </a>
      {allPosts ? (
        <Link
          to="/home"
          type="button"
          className="btn btn-link nav-link"
          onClick={() => toggleAllPosts(!allPosts)}>
          Home
        </Link>
      ) : (
        <Link
          to="/allposts"
          type="button"
          className="btn btn-link nav-link"
          onClick={() => toggleAllPosts(!allPosts)}>
          All Posts
        </Link>
      )}
      <ul className="nav justify-content-between">
        <li className="nav-item">
          <button
            type="button"
            className="btn btn-link nav-link"
            onClick={() => togglePopup(true, "post")}>
            Post
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="btn btn-link nav-link"
            onClick={() => togglePopup(true, "users")}>
            Users
          </button>
        </li>
        <li className="nav-item">
          <Link to="/profile" type="button" className="btn btn-link nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" type="button" className="btn btn-link nav-link" onClick={() => logoutUser()}>
            Logout
          </Link>
        </li>
      </ul>
      {popup ? <Popup /> : null}
    </nav>
  );
};
