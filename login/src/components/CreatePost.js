import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const CreatePost = (props) => {
  const [text, setText] = useState("");

  const { addPost, togglePopup } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: text,
      user: "user"
    };

    addPost(newPost);
    togglePopup(false);
  };
  return (
    <div className="card create-post my-auto" onMouseEnter={() => props.setPopupRemovable(false)} onMouseLeave={() => props.setPopupRemovable(true)}>
      <h4 className="card-header bg-primary text-light">Create Post</h4>
      <form className="card-body form-group" onSubmit={onSubmit}>
        <textarea type="textarea" className="form-control" rows="4" value={text} onChange={e => setText(e.target.value)}></textarea>
        <button type="submit" className="btn btn-primary mt-4" >Submit</button>
      </form>
    </div>
  );
};
