import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/midhah-lyrics-logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <img src={logo} height="70px" />
          </a>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact Us
              </a>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Navbar;
