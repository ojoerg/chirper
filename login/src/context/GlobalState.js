import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  message: "",
  username: "",
  popup: false,
  popupType: "",
  posts: [],
  allPosts: false,
  users: [],
  user: {},
  follows: [],
  error: null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function checkAuthenticated(callback) {
    try {
      const res = await fetch("api/v1/users/authenticated", {
        credentials: "include"
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else if (response.success === false) {
        dispatch({
          type: "AUTHENTICATE_ERROR",
          msg: "Authentication error"
        });
      } else {
        dispatch({
          type: "AUTHENTICATE_USER",
          username: response.username,
          follows: response.follows
        });
      }
      await callback;
    } catch (err) {
      dispatch({
        type: "AUTHENTICATE_ERROR",
        msg: err
      });
    }
  }

  async function registerUser(user) {
    try {
      const res = await fetch("api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const response = await res.json();
      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "REGISTER_USER",
          msg: "User successfully created"
        });
      }
    } catch (err) {
      dispatch({
        type: "REGISTER_ERROR",
        msg: err
      });
    }
  }

  async function loginUser(user) {
    try {
      const res = await fetch("api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "LOGIN_USER",
          msg: response.message,
          username: response.username,
          follows: response.follows
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        msg: err.data.error
      });
    }
  }

  async function changeUserProperty(dataToChange) {
    try {
      const res = await fetch("api/v1/users/change", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToChange)
      });

      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "CHANGE_USER",
          msg: response.message,
          username: response.username,
          user: response.user
        });
      }
    } catch (err) {
      dispatch({
        type: "CHANGE_ERROR",
        msg: err
      });
    }
  }

  async function logoutUser() {
    try {
      const res = await fetch("api/v1/users/logout", {
        credentials: "include"
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else if (response.success === false) {
        dispatch({
          type: "LOGOUT_ERROR",
          msg: "Logout Error"
        });
      } else {
        dispatch({
          type: "LOGOUT_USER",
          username: ""
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGOUT_ERROR",
        msg: err
      });
    }
  }

  async function getPosts() {
    try {
      const res = await fetch("api/v1/posts");
      const posts = await res.json();

      dispatch({
        type: "GET_POSTS",
        payload: posts.data
      });
    } catch (err) {
      dispatch({
        type: "POSTS_ERROR",
        payload: err.response.data.error
      });
    }
  }

  async function getPostsFromFollowedUsers(user) {
    try {
      const res = await fetch("api/v1/posts/followed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "username": user })
      });
      const posts = await res.json();

      dispatch({
        type: "GET_POSTS_FROM_FOLLOWED_USERS",
        payload: posts.data
      });
    } catch (err) {
      dispatch({
        type: "POSTS_FROM_FOLLOWED_USERS_ERROR",
        payload: err
      });
    }
  }

  async function getUsers() {
    try {
      const res = await fetch("api/v1/users");
      const users = await res.json();

      dispatch({
        type: "GET_USERS",
        payload: users.data
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response.data.error
      });
    }
  }

  async function getUser(user) {
    try {
      const res = await fetch("api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: user })
      });
      const userData = await res.json();

      dispatch({
        type: "GET_USER",
        payload: userData.data
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err
      });
    }
  }

  function togglePopup(boolVal, type) {
    if (!type) {
      type = "";
    }

    dispatch({
      type: "TOGGLE_POPUP",
      popup: boolVal,
      popupType: type
    });
  }

  function toggleAllPosts(boolVal) {

    dispatch({
      type: "TOGGLE_ALLPOSTS",
      allPosts: boolVal
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

  async function addFollow(user, userToFollow) {
    try {
      console.log(JSON.stringify({
        "userToFollow": userToFollow,
        "username": user
      }))
      const res = await fetch("api/v1/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userToFollow": userToFollow,
          "username": user
        })
      });
      const response = await res.json();

      dispatch({
        type: "ADD_FOLLOW",
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: "FOLLOW_ERROR",
        payload: err
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        message: state.message,
        loggedIn: state.loggedIn,
        username: state.username,
        popup: state.popup,
        popupType: state.popupType,
        posts: state.posts,
        allPosts: state.allPosts,
        users: state.users,
        user: state.user,
        follows: state.follows,
        error: state.error,
        logoutUser,
        getPosts,
        getPostsFromFollowedUsers,
        getUsers,
        getUser,
        addFollow,
        togglePopup,
        toggleAllPosts,
        addPost,
        checkAuthenticated,
        registerUser,
        loginUser,
        changeUserProperty
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
