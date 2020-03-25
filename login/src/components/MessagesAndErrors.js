import React, { useContext } from "react";
import ReactHtmlParser from 'react-html-parser'; 
import { GlobalContext } from "../context/GlobalState";


export const MessagesAndErrors = () => {
  const { message, error, clearMessages, clearErrors } = useContext(GlobalContext);

  const displayMessagesAndErrors = () => {
    if (message !== "") {
      return (
        <div className="alert alert-dismissible alert-success">
          <button type="button" className="close" data-dismiss="alert" onClick={() => clearMessages()}>
            &times;
          </button>
          {ReactHtmlParser (message)}
        </div>
      );
    } 
    
    if (error !== "") {
      return (
        <div className="alert alert-dismissible alert-danger">
          <button type="button" className="close" data-dismiss="alert" onClick={() => clearErrors()}>
            &times;
          </button>
          {ReactHtmlParser (error)}
        </div>
      );
    }
  };

  return <>{displayMessagesAndErrors()}</>;
};
