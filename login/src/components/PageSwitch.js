import React, { useContext, useState, useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Welcome } from "./Welcome";
import { Register } from "./Register";
import { Login } from "./Login";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { Loading } from "./Loading";
import { Profile } from "./Profile";
import { AllPosts } from "./AllPosts";
import { User } from "./User";

import { GlobalContext } from "../context/GlobalState";

export const PageSwitch = () => {
  const { loggedIn, username, checkAuthenticated } = useContext(GlobalContext);
  const [authenticatedChecked, setAuthenticatedChecked] = useState(false);

  useEffect(() => {
    checkAuthenticated(setAuthenticatedChecked(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loggedInChangePage = () => {
    if (loggedIn === true && username !== "") {
      return (
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/allposts" component={AllPosts} />
          <Route exact path="/user/:username" component={User} />
          <Route path="/">
            <Redirect to="/home" />
          </Route>

          <Route component={NotFound} />
        </Switch>
      );
    } else if (loggedIn === false && authenticatedChecked === true) {
      return (
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile">
            <Redirect to="/" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home">
            <Redirect to="/" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" component={Loading} />
          <Route component={NotFound} />
        </Switch>
      );
    }
  };

  return <Suspense fallback={Loading}>{loggedInChangePage()}</Suspense>;
};
