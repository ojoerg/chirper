import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Popup } from "./Popup";

export const Header = () => {
  const { popup } = useContext(GlobalContext);
  const { togglePopup } = useContext(GlobalContext);

  return (
    <div className="header-container">
      <header className="header">
        <div className="header-div">
          <i className="fas fa-dove fa-2x"></i>
          <h1>Chirper</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button onClick={() => togglePopup(!popup)}>Post</button>
            </li>
            <li>
              <button onClick={() => togglePopup(!popup)}>Users</button>
            </li>
            <li>
              <button onClick={() => togglePopup(!popup)}>Profile</button>
            </li>
            <li>
              <button onClick={() => togglePopup(!popup)}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      {popup ? <Popup /> : null}
    </div>
  );
};
