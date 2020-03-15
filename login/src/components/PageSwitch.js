import React, { useContext, useState, useEffect, Suspense } from "react";
import { Route, Switch, Redirect, Lo } from "react-router-dom";

import { Welcome } from "./Welcome";
import { Register } from "./Register";
import { Login } from "./Login";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { Loading } from "./Loading";

import { GlobalContext } from "../context/GlobalState";

export const PageSwitch = () => {
  const { loggedIn, username, checkAuthenticated } = useContext(GlobalContext);
  const [authenticatedChecked, setAuthenticatedChecked] = useState(false);

  useEffect(() => {
    //setTimeout(() => {
      checkAuthenticated()
      setAuthenticatedChecked(true);
      
    //}, 1000);
    
  }, []);

  const loggedInChangePage = () => {
    
    if (loggedIn === true && username !== "") {
      return (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      );
    } else if (loggedIn === false && authenticatedChecked === false) {
      return (
        <Switch>
          <Route path="/" component={Loading} />
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home">
            <Redirect to="/"/>
          </Route>
          <Route component={NotFound} />
        </Switch>
      );
    }
  };

  return <Suspense fallback={Loading}>{loggedInChangePage()}</Suspense>;
};
