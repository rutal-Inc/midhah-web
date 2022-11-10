import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center mx-3 py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <a
            href="/"
            class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></a>
          <span class="mb-3 mb-md-0 text-muted">© {year} Midhah</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a class="text-muted" href="#"></a>
          </li>
          <li class="ms-3">
            <a
              class="text-muted"
              href="https://www.instagram.com/midhah.official/"
            >
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li class="ms-3">
            <a
              class="text-muted"
              href="https://www.facebook.com/midhah.official"
            >
              <i class="bi bi-facebook"></i>
            </a>
          </li>
          <li class="ms-3">
            <a class="text-muted" href="https://twitter.com/midhahOfficial">
              <i class="bi bi-twitter"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
