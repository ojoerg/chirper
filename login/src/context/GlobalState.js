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
  error: "",
  filePath: "",
  likeAddedRemoved: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function checkAuthenticated(callback) {
    try {
      const res = await fetch("/api/v1/users/authenticated", {
        credentials: "include",
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else if (response.success === false) {
        dispatch({
          type: "AUTHENTICATE_ERROR",
          msg: "Authentication error",
        });
      } else {
        dispatch({
          type: "AUTHENTICATE_USER",
          username: response.username,
          follows: response.follows,
        });
      }
      await callback;
    } catch (err) {
      dispatch({
        type: "AUTHENTICATE_ERROR",
        msg: err,
      });
    }
  }

  async function registerUser(user) {
    try {
      const res = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "REGISTER_USER",
          msg: "User successfully created! => <a href='/login'>LOGIN</a>",
        });
      }
    } catch (err) {
      dispatch({
        type: "REGISTER_ERROR",
        msg: err,
      });
    }
  }

  async function loginUser(user) {
    try {
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "LOGIN_USER",
          msg: "You successfully logged in!",
          username: response.username,
          follows: response.follows,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "LOGIN_ERROR",
        msg: err,
      });
    }
  }

  async function changeUserProperty(dataToChange) {
    try {
      const res = await fetch("/api/v1/users/change", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToChange),
      });

      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else if (dataToChange.type === "delete") {
        logoutUser();
      } else {
        dispatch({
          type: "CHANGE_USER",
          msg: "User updated successfully!",
          username: response.username,
          user: response.user,
        });
      }
    } catch (err) {
      dispatch({
        type: "CHANGE_ERROR",
        msg: err,
      });
    }
  }

  async function logoutUser() {
    try {
      const res = await fetch("/api/v1/users/logout", {
        credentials: "include",
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else if (response.success === false) {
        dispatch({
          type: "LOGOUT_ERROR",
          msg: "Logout Error",
        });
      } else {
        dispatch({
          type: "LOGOUT_USER",
          username: "",
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGOUT_ERROR",
        msg: err,
      });
    }
  }

  async function getPosts() {
    try {
      const res = await fetch("/api/v1/posts");
      const posts = await res.json();

      if (posts.error) {
        throw posts.error;
      } else {
        dispatch({
          type: "GET_POSTS",
          payload: posts.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "POSTS_ERROR",
        payload: "Posts could not be retrieved!",
      });
    }
  }

  async function getPostsFromFollowedUsers(user) {
    try {
      const res = await fetch("/api/v1/posts/followed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      const posts = await res.json();

      if (posts.error) {
        throw posts.error;
      } else {
        dispatch({
          type: "GET_POSTS_FROM_FOLLOWED_USERS",
          payload: posts.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "POSTS_FROM_FOLLOWED_USERS_ERROR",
        payload: err,
      });
    }
  }

  async function getUsers() {
    try {
      const res = await fetch("/api/v1/users");
      const users = await res.json();

      if (users.error) {
        throw users.error;
      } else {
        dispatch({
          type: "GET_USERS",
          payload: users.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: "Users could not be retrieved!",
      });
    }
  }

  async function getUser(user) {
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      const userData = await res.json();

      if (userData.error) {
        throw userData.error;
      } else {
        dispatch({
          type: "GET_USER",
          payload: userData.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err,
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
      popupType: type,
    });
  }

  function toggleAllPosts(boolVal) {
    clearMessages();
    clearErrors();
    dispatch({
      type: "TOGGLE_ALLPOSTS",
      allPosts: boolVal,
    });
  }

  function clearMessages() {
      dispatch({
        type: "CLEAR_MESSAGES"
      });
  }

  function clearErrors() {
    dispatch({
      type: "CLEAR_ERRORS"
    });
  }

  async function addPost(post) {
    try {
      const res = await fetch("/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "ADD_POST",
          payload: response.data,
          message: "Successfully added post!",
        });
      }
    } catch (err) {
      dispatch({
        type: "POST_ERROR",
        payload: "Post could not be added!",
      });
    }
  }

  async function addAnswer(answer) {
    try {
      const res = await fetch("/api/v1/posts/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answer)
      });

      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "ADD_ANSWER",
          message: "Successfully added answer!",
        });
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: "ANSWER_ERROR",
        payload: "Answer could not be added!",
      });
    }
  }

  async function getPostsFromUser(user) {
    try {
      const res = await fetch("/api/v1/posts/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "GET_POSTS",
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "POSTS_ERROR",
        payload: "Posts could not be retrieved!",
      });
    }
  }

  async function addFollow(user, userToFollow) {
    try {
      const res = await fetch("/api/v1/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToFollow: userToFollow,
          username: user,
        }),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "ADD_FOLLOW",
          payload: response.data,
          message: "Successfully added new user to followed!",
        });
      }
    } catch (err) {
      dispatch({
        type: "FOLLOW_ERROR",
        payload: err,
      });
    }
  }

  async function uploadFile(formData) {
    try {
      const res = await fetch("/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "UPLOAD_FILE",
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "UPLOAD_ERROR",
        payload: err,
      });
    }
  }

  async function getFile(type, user) {
    try {
      const res = await fetch("/api/v1/files/path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          type,
        }),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "GET_FILE",
          filePath: response.path,
        });
      }
    } catch (err) {
      dispatch({
        type: "GET_FILE_ERROR",
        error: err,
      });
    }
  }

  async function addRemoveLike(id, user) {
    try {
      const res = await fetch("/api/v1/posts/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          id,
        }),
      });
      const response = await res.json();

      if (response.error) {
        throw response.error;
      } else {
        dispatch({
          type: "ADD_REMOVE_LIKE",
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "LIKE_ERROR",
        error: err,
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
        filePath: state.filePath,
        likeAddedRemoved: state.likeAddedRemoved,
        logoutUser,
        getPosts,
        getPostsFromFollowedUsers,
        getUsers,
        getUser,
        addFollow,
        togglePopup,
        toggleAllPosts,
        clearMessages,
        clearErrors,
        addPost,
        addAnswer,
        getPostsFromUser,
        checkAuthenticated,
        registerUser,
        loginUser,
        changeUserProperty,
        getFile,
        uploadFile,
        addRemoveLike,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
