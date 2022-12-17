import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import greylogo from "../assets/midhah-logo-grey.svg";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div>
      <footer className="container mx-auto py-3 my-4 border-top">
        <div className="row flex-wrap justify-content-between align-items-center">
          <ul className="nav col-md-4 justify-content-center justify-content-md-start list-unstyled d-flex order-2 order-md-1 my-3">
            <li>
              <a
                className="text-muted"
                href="https://www.facebook.com/midhah.official"
                target="_blank"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://twitter.com/midhahOfficial"
                target="_blank"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.instagram.com/midhah.official/"
                target="_blank"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </li>
          </ul>

          <div className="col-md-4 d-flex align-items-center justify-content-center my-3 order-3 order-md-2">
            <img
              src={greylogo}
              alt="Midhah Grey Logo"
              style={{
                width: "30px",
                marginRight: "5px",
              }}
            />
            <span className="mb-0 mx-1 text-muted">&copy; {year} Midhah</span>
          </div>

          <div className="d-flex col-md-4 justify-content-center justify-content-md-end my-3 order-2 order-md-3">
            <a
              href="/privacy-policy"
              className="text-muted"
              style={{ textDecoration: "none" }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
