import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="mx-auto flex w-[85%] flex-col items-center justify-between border-t-2 pb-10 pt-6 text-center md:flex-row">
      <ul className="nav col- nd:justify-start flex justify-center gap-5  ">
        <li>
          <a
            className="text-gray-500"
            href="https://www.facebook.com/midhah.official"
            target="_blank"
          >
            <i className="bi bi-facebook"></i>
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-gray-500"
            href="https://twitter.com/midhahOfficial"
            target="_blank"
          >
            <i className="bi bi-twitter-x"></i>
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-gray-500"
            href="https://www.instagram.com/midhah.official/"
            target="_blank"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-gray-500"
            href="https://github.com/rutal-Inc/midhah-web"
            target="_blank"
          >
            <i className="bi bi-github"></i>
          </a>
        </li>
      </ul>

      <div className="col-md-4 my-3 flex items-center justify-center">
        <Image
          src="/images/midhah-logo-grey.svg"
          alt="midhah-logo-grey"
          className="mr-1"
          width={30}
          height={30}
        />
        <span className="mx-1 mb-0 text-gray-500">&copy; {year} Midhah</span>
      </div>

      <div className="col-md-4 order-md-3 order-2 my-3 flex justify-center md:justify-end">
        <Link
          href="/privacy-policy"
          className="text-de text-gray-500"
          style={{ textDecoration: "none" }}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;
