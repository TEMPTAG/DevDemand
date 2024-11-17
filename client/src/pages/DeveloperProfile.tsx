// import { useEffect, useState, useLayoutEffect } from "react";
// import { useState } from "react";

// import ErrorPage from "./ErrorPage";
import ProfileForm from "../components/ProfileForm/ProfileForm.tsx";
// import auth from "../utils/auth";

const DeveloperProfile = () => {
//   const [error, _setError] = useState(false);
//   const [loginCheck, _setLoginCheck] = useState(false);

  //   const checkLogin = () => {
  //     if (auth.loggedIn()) {
  //       setLoginCheck(true);
  //     }
  //   };

  //   useLayoutEffect(() => {
  //     checkLogin();
  //   }, []);

//   if (error) {
//     return <ErrorPage />;
//   }

  return (
    <>
      <h2>Developer Profile</h2>
      <ProfileForm />
    </>
  );
};

export default DeveloperProfile;
