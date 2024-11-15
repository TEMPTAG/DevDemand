// import { useEffect, useState, useLayoutEffect } from "react";
import { useState, useLayoutEffect } from "react";

import ErrorPage from "./ErrorPage";

import auth from "../utils/auth";

const Dashboard = () => {
  const [error, _setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
      if (auth.loggedIn()) {
        setLoginCheck(true);
      }
    };

    useLayoutEffect(() => {
      checkLogin();
    }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="jumbotron">
      {!loginCheck ? <h1>DevDemand Coming Soon...</h1> : <h1>Logged In...</h1>}
    </div>
  );
};

export default Dashboard;
