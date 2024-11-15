import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Logo = "/assets/logos/DDHeaderLogo.svg";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setLoginCheck(auth.loggedIn());
    };
    checkLogin();
  }, []);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    auth.logout();
    setLoginCheck(false);
    window.location.assign("/");
  };

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
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          role="navigation"
        >
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
                  <Link className="nav-link" to="/login">
                    Developer Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
