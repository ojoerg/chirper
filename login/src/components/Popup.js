import React, { useContext, useState } from "react";
import { CreatePost } from "./CreatePost";
import { Users } from "./Users";
import { GlobalContext } from "../context/GlobalState";

export const Popup = () => {
  const { togglePopup, popupType } = useContext(GlobalContext);
  const [popupRemovable, setPopupRemovable] = useState(true);

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

  // setPopupRemovable={setPopupRemovable}
  return (
    <>
      <div className="popup" onClick={() => (popupRemovable === true ? togglePopup(false) : null)}>
        {popupSwitch()}
      </div>
    </>
  );
};
