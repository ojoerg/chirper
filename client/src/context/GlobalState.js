import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State

const initialState = {
  popup: false,
  posts: [],
  error: null,
  //loading: true,
  user: "test"
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getPosts() {
    try {
      const res = await fetch("api/v1/posts");
      const posts = await res.json();
      console.log(posts.data);

      dispatch({
        type: "GET_POSTS",
        payload: posts.data
      });
    } catch (err) {
      dispatch({
        type: "POST_ERROR",
        payload: err.response.data.error
      });
    }
  }

  function togglePopup(boolVal) {
    dispatch({
      type: "TOGGLE_POPUP",
      payload: boolVal
    });
  }

  async function addPost(post) {
    try {
      const res = await fetch("api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      const response = await res.json();

      console.log(response);

      dispatch({
        type: "ADD_POST",
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: "POST_ERROR",
        payload: err.response.data.error
      });
    }
  }

  /*function addPost(postText){
        dispatch({
            type: "ADD_POST",
            payload: postText
        })
    }*/

  return (
    <GlobalContext.Provider
      value={{
        popup: state.popup,
        posts: state.posts,
        error: state.error,
        loading: state.loading,
        getPosts,
        togglePopup,
        addPost
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
