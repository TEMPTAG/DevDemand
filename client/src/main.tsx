import ReactDOM from "react-dom/client"; // React DOM for rendering components
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // React Router for client-side routing
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JavaScript for interactivity
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "./App.css"; // Custom application styles

import App from "./App.tsx"; // Main application component
import ErrorPage from "./pages/ErrorPage.tsx"; // Error page for handling 404 or other route errors
import Dashboard from "./pages/Dashboard.tsx"; // Dashboard page component
import Developer from "./pages/DeveloperProfile.tsx"; // Developer profile page component

// Define routes for the application
const router = createBrowserRouter([
  {
    path: "/", // Root path of the application
    element: <App />, // Main application layout
    errorElement: <ErrorPage />, // Fallback for route errors
    children: [
      {
        index: true, // Default child route for "/"
        element: <Dashboard />, // Renders the Dashboard component
      },
      {
        path: "/developer", // Path for the developer profile page
        element: <Developer />, // Renders the Developer component
      },
      {
        path: "*", // Wildcard path for undefined routes
        element: <ErrorPage />, // Fallback to ErrorPage for unmatched routes
      },
    ],
  },
]);

// Get the root element from the HTML document
const rootElement = document.getElementById("root");

// Check if the root element exists before rendering
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} /> // Provide the router to the application
  );
}
