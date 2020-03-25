import React, { useContext, useState, useEffect } from "react";
import { CreatePost } from "./CreatePost";
import { Users } from "./Users";
import { GlobalContext } from "../context/GlobalState";

export const Popup = () => {
  const { togglePopup, popupType, clearMessages, clearErrors } = useContext(GlobalContext);
  const [popupRemovable, setPopupRemovable] = useState(true);

  useEffect(() => {
    clearMessages();
    clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array for no loop

  const popupSwitch = () => {
    switch (popupType) {
      case "post":
        return <CreatePost setPopupRemovable={setPopupRemovable} />;

      case "users":
        return <Users setPopupRemovable={setPopupRemovable} />;

      default:
        return togglePopup(false);
    }
  };

  return (
    <>
      <div className="popup" onClick={() => (popupRemovable === true ? togglePopup(false) : null)}>
        {popupSwitch()}
      </div>
    </>
  );
};
