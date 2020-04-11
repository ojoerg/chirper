import React, { useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import { GlobalContext } from "../context/GlobalState";

export const MessagesAndErrors = () => {
  const { message, error, clearMessages, clearErrors } = useContext(GlobalContext);

  const displayMessagesAndErrors = () => {
    if (message !== "") {
      setTimeout(() => clearMessages(), 5000);
      return (
        <div className="alert alert-dismissible alert-success">
          <button type="button" className="close" onClick={() => clearMessages()}>
            &times;
          </button>
          {ReactHtmlParser(message)}
        </div>
      );
    } else if (error !== "") {
      setTimeout(() => clearErrors(), 5000);
      return (
        <div className="alert alert-dismissible alert-danger">
          <button type="button" className="close" onClick={() => clearErrors()}>
            &times;
          </button>
          {ReactHtmlParser(error)}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return <>{displayMessagesAndErrors()}</>;
};
