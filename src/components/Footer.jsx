import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center mx-3 py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></a>
          <span className="mb-3 mb-md-0 text-muted">&copy; {year} Midhah</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#"></a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://www.instagram.com/midhah.official/"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://www.facebook.com/midhah.official"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com/midhahOfficial">
              <i className="bi bi-twitter"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
