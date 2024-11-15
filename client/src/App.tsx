// Import the Outlet component to render child routes
import { Outlet } from "react-router-dom";
// Import the Header component
import Header from "./components/Header";
// Import the Footer component
import Footer from "./components/Footer";

// The main App component that serves as the layout for the entire application
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
