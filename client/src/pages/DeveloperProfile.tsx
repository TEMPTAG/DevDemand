// import { useEffect, useState, useLayoutEffect } from "react";
import { useState } from "react";

import ErrorPage from "./ErrorPage";

// import auth from "../utils/auth";

const Developer = () => {
  const [error, _setError] = useState(false);
  const [_loginCheck, _setLoginCheck] = useState(false);

  //   const checkLogin = () => {
  //     if (auth.loggedIn()) {
  //       setLoginCheck(true);
  //     }
  //   };

  //   useLayoutEffect(() => {
  //     checkLogin();
  //   }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div>
      <h1>Developer Bio Page</h1>
    </div>
  );
};

export default Developer;
