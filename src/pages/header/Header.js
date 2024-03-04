import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../../functions/logout";
import styled from "./header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // logout
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light  px-5 mb-5 ${styled.bgNavbar}`}
      >
        <div className="container-fluid">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-primary"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link active text-primary"
                  aria-current="page"
                  to="/getclassdata"
                >
                  Class
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  className="nav-link active text-primary"
                  aria-current="page"
                  to="viewForm"
                >
                  View Form
                </Link>
              </li>
            </ul>
            <form className="">
              {token && user ? (
                <button
                  type="submit"
                  onClick={logout}
                  className="text-decoration-none py-1 px-3 bg-primary text-light fw-bold rounded-3 ms-3 border-0"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="text-decoration-none py-1 px-3 bg-primary text-light fw-bold rounded-3"
                >
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
