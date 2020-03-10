import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State
const initialState = {
  page: "welcome", // welcome, register, login, home
  message: ""
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function registerUser(user) {
    try {
      console.log(user)
      const res = await fetch("api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      const response = await res.json();
      console.log(response);
      if (response.error){
        throw response.error
      } else {
        dispatch({
          type: "REGISTER_USER",
          payload: "User successfully created"
        });
      }
      dispatch({
        type: "REGISTER_USER",
        payload: "User successfully created"
      });
    } catch (err) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: err
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
      console.log(response);
      
      if (response.error){
        throw response.error
      } else {
        dispatch({
          type: "LOGIN_USER",
          payload: response.message
        });
      }
    } catch (err) {
      console.log(JSON.stringify(err))
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.error
      });
    }
  }

  function changePage(page) {
    dispatch({
      type: "CHANGE_PAGE",
      payload: page
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        page: state.page,
        message: state.message,
        changePage,
        registerUser,
        loginUser
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
