import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div>
      <footer className="container mx-auto py-3 my-4 border-top">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">
              &copy; {year} Midhah
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex ">
            <li className="ms-3">
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

          
          
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;
