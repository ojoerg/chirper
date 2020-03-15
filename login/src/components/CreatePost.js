import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const CreatePost = () => {
    const [text, setText] = useState("");

    const { addPost, togglePopup } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        
        const newPost = {
          text: text,
          user: "user"
        }
    
        addPost(newPost);
        togglePopup(false)
      }
    return (
        <div className="create-post">
        <h3>Create Post</h3>
        <form onSubmit={onSubmit}>
            <input type="textarea" value={text} onChange={(e) => setText(e.target.value)}></input>
            <button>Submit</button>
        </form>
        </div>
    );
};
