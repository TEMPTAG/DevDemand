// import { useEffect, useState, useLayoutEffect } from "react";
// import { useState } from "react";

// import ErrorPage from "./ErrorPage";
import ProfileCard from "../components/ProfileCard/ProfileCard.tsx";
// import auth from "../utils/auth";

const Dashboard = () => {
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
       <ProfileCard isLoading={false} developer={{
  imageUrl: '',
  firstName: 'John',
  lastName: 'Smith',
  telephone: '0000000000',
  email: 'johnsmith@email.com',
  city: 'New York',
  state: 'NY',
  portfolioLink: 'https://portfolio.com',
  githubLink: 'https://github.com',
  hourlyRate: 100,
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat mi, pellentesque non orci vel, ultrices pulvinar risus. Curabitur eget lorem volutpat, feugiat tellus quis, pharetra nunc. Proin eget mi erat. Mauris id pulvinar neque. Quisque in mi orci. Fusce hendrerit a tellus sollicitudin placerat. In a placerat ex. Mauris cursus dui a gravida finibus. Vestibulum iaculis pulvinar ex, accumsan pharetra tortor.'
}} />
    </>
  );
};

export default Dashboard;
