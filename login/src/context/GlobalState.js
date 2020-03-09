import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State

const initialState = {
  newUser: {},
  user: {}
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user
    });
  }

  function loginUser(user) {
    dispatch({
      type: "LOGIN_USER",
      payload: user
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        newUser: state.newUser,
        user: state.user,
        addUser,
        loginUser
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
