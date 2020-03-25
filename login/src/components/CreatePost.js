import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MessagesAndErrors } from "./MessagesAndErrors";

export const CreatePost = props => {
  const [text, setText] = useState("");
  const { addPost, togglePopup, username, clearMessages, clearErrors } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: text,
      username: username
    };

    clearMessages();
    clearErrors();
    addPost(newPost);
    togglePopup(false);
  };

  const removePopupButton = () => {
    clearMessages();
    clearErrors();
    togglePopup(false);
    props.setPopupRemovable(true);
  };

  return (
    <div
      className="card my-auto"
      onMouseEnter={() => props.setPopupRemovable(false)}
      onMouseLeave={() => props.setPopupRemovable(true)}>
      <div className="card-header bg-primary pt-1 pb-0">
        <ul className="nav nav-pills card-header-pills justify-content-between align-items-center">
          <li className="nav-item">
            <h4 className="nav-link">Create Post</h4>
          </li>
          <li className="nav-item">
            <button className="btn btn-link text-danger" onClick={() => removePopupButton()}>
              <i className="fas fa-times-circle fa-2x"></i>
            </button>
          </li>
        </ul>
      </div>
      <MessagesAndErrors />
      <form className="card-body form-group" onSubmit={onSubmit}>
        <textarea
          type="textarea"
          className="form-control"
          rows="4"
          value={text}
          onChange={e => setText(e.target.value)}></textarea>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};
