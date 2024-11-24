import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap"; // Import React-Bootstrap components
import auth from "../utils/auth";
import LoginForm from "./Modals/Login";
import SignupForm from "./Modals/Signup";

// Logo image path
const Logo = "/assets/logos/DDHeaderLogo.svg";

// Navbar component
const Header: React.FC = () => {
  // State to check login status
  const [loginCheck, setLoginCheck] = useState(false);

  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to toggle between Login and Signup forms
  const [isLogin, setIsLogin] = useState(true);

  // React Router's navigate function for redirection
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  // Handle logout logic
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    auth.logout(); // Call the logout function from the auth utility
    setLoginCheck(false); // Update the login state
    window.location.assign("/"); // Redirect to the home page
  };

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Switch modal content to the Signup form
  const switchToSignup = () => setIsLogin(false);

  // Switch modal content to the Login form
  const switchToLogin = () => setIsLogin(true);

  return (
    <>
      {/* Top banner message */}
      <div
        className="text-center text-white bg-primary py-1"
        style={{ fontSize: "13px" }}
      >
        The Right Talent, Right Now - Browse Our Developer Database and Take
        Your Project from Dream to Deployed!
      </div>

      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow">
        <Container>
          {/* Logo and brand link */}
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="DEVDemand Logo" style={{ height: "100px" }} />
          </Navbar.Brand>

          {/* Responsive toggle button */}
          <Navbar.Toggle aria-controls="mainMenu" />

          {/* Navbar links */}
          <Navbar.Collapse id="mainMenu">
            <Nav className="ms-auto">
              {!loginCheck ? (
                // Show Developer Login button if not logged in
                <Nav.Item>
                  <Button
                    variant="link"
                    className="nav-link"
                    onClick={toggleModal}
                  >
                    Developer Login
                  </Button>
                </Nav.Item>
              ) : (
                // Show My Account and Logout links if logged in
                <>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/developer">
                      My Account
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal show={showModal} onHide={toggleModal}>
        {/* Modal Header */}
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
        </Modal.Header>

        {/* Modal Body */}
        <Modal.Body>
          {isLogin ? (
            // Login Form
            <LoginForm
              handleModalClose={() => {
                toggleModal();
                navigate("/developer"); // Redirect after successful login
              }}
            />
          ) : (
            // Signup Form
            <SignupForm
              handleModalClose={() => {
                toggleModal();
                navigate("/developer"); // Redirect after successful signup
              }}
            />
          )}
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer>
          {isLogin ? (
            // Link to switch to Signup form
            <Button variant="link" onClick={switchToSignup}>
              Don’t have an account? Sign Up
            </Button>
          ) : (
            // Link to switch to Login form
            <Button variant="link" onClick={switchToLogin}>
              Already have an account? Login
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
