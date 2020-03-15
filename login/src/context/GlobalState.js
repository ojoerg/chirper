import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  message: "",
  loggedIn: false,
  username: "",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function checkAuthenticated() {
    try {
      const res = await fetch("api/v1/users/authenticated", {
          credentials: "include"
      });
      const response = await res.json();
      console.log(response)

      if (response.error) {
        throw response.error;
      } else if (response.success === false) {
        dispatch({
          type: "AUTHENTICATE_ERROR"
        });
      }else {
        dispatch({
          type: "AUTHENTICATE_USER",
          username: response.username
        });
      }
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
          username: response.username
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        msg: err.data.error
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        message: state.message,
        loggedIn: state.loggedIn,
        username: state.username,
        checkAuthenticated,
        registerUser,
        loginUser
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
