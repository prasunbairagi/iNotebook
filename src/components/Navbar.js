import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const theme = useSelector((state) => state.theme);
  let location = useLocation();
  let navigate = useNavigate();
  const userName = localStorage.getItem('username')
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary ${
          theme === "dark" ? "navbar-dark" : "navbar-light"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {userName && <span>{userName.split(" ")[0]}'s </span>}NoteBook 
          </Link>
          <div className="d-flex">
            <div className="d-block d-lg-none my-auto pe-3 pointer">
              <div className="my-auto ">
                {theme === "light" ? (
                  <div
                    onClick={() => {
                      actions.darkTheme("dark");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloudMoon}
                      style={{ color: "#070808" }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      actions.lightTheme("light");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloudSun}
                      style={{ color: "#f8760d" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="my-auto d-none d-lg-block pe-3 pointer">
            {theme === "light" ? (
                  <div
                    onClick={() => {
                      actions.darkTheme("dark");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloudMoon}
                      style={{ color: "#070808" }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      actions.lightTheme("light");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCloudSun}
                      style={{ color: "#f8760d" }}
                    />
                  </div>
                )}
            </div>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary me-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary me-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
