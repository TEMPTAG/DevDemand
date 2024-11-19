import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import auth from "../utils/auth";
import LoginForm from "./Login";
import SignupForm from "./Signup";

const Logo = "/assets/logos/DDHeaderLogo.svg";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    auth.logout();
    setLoginCheck(false);
    window.location.assign("/");
  };

  const toggleModal = () => setShowModal(!showModal);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <>
      <div
        className="text-center text-white bg-primary py-1"
        style={{ fontSize: "13px" }}
      >
        The Right Talent, Right Now - Browse Our Developer Database and Take
        Your Project from Dream to Deployed!
      </div>
      <div className="container-fluid mb-4 shadow">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="DEVDemand Logo" style={{ height: "100px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainMenu"
            aria-controls="mainMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-l-0">
              {!loginCheck ? (
                <li className="nav-item">
                  <Button
                    className="nav-link"
                    variant="link"
                    onClick={toggleModal}
                  >
                    Developer Login
                  </Button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/developer">
                    My Account
                  </Link>
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <LoginForm handleModalClose={toggleModal} />
          ) : (
            <SignupForm handleModalClose={toggleModal} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLogin ? (
            <Button variant="link" onClick={switchToSignup}>
              Don’t have an account? Sign Up
            </Button>
          ) : (
            <Button variant="link" onClick={switchToLogin}>
              Already have an account? Login
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
