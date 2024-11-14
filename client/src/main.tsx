import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
// import Login from "./pages/Login.tsx";
// import Developer from "./pages/DeveloperProfile.tsx";

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
      //   {
      //     path: "/developer",
      //     element: <Developer />,
      //   },
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
