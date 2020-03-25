import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export const NotFound = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center">
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <div className="mt-5 pt-5">
          <h1 className="mt-5 pt-5">Sorry, page not found</h1>
          <h2 className="">You will be redirected in 2 Seconds</h2>
        </div>
      )}
    </div>
  );
};
