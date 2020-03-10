import React, {useContext } from 'react';
import { Welcome } from "./Welcome";
import { Register } from "./Register";
import { Login } from "./Login";
import { GlobalContext } from "../context/GlobalState";

export const PageSwitch = () => {
    const { page } = useContext(GlobalContext);

    const componentToRender = () => {
        if (page === "register"){
          return <Register />;
        } else if (page === "login") {
          return <Login />;
        } else {
          return <Welcome />;
        }
      }
    return (
        <>
           {componentToRender()} 
        </>
    )
}
