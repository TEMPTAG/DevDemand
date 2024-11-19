import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
// import Login from "./pages/Login.tsx";
import DeveloperProfile from "./pages/DeveloperProfile.tsx";
import ProfileCard from "./pages/ProfileCard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      //   {
      //     path: "/login",
      //     element: <Login />,
      //   },
        {
          path: "/developer-profile",
          element: <DeveloperProfile />,
        },
        {
          path: "/profilecard",
          element: <ProfileCard />,
        },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
