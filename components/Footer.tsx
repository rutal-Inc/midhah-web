import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="w-[85%] flex md:flex-row flex-col justify-between items-center text-center border-t-2 pt-6 pb-10 mx-auto">
      <ul className="nav col- justify-center nd:justify-start flex gap-5  ">
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
            <i className="bi bi-twitter"></i>
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
      </ul>

      <div className="col-md-4 flex items-center justify-center my-3">
        <Image
          src="/images/midhah-logo-grey.svg"
          alt="midhah-logo-grey"
          className="mr-1"
          width={30}
          height={30}
        />
        <span className="mb-0 mx-1 text-gray-500">&copy; {year} Midhah</span>
      </div>

      <div className="flex col-md-4 justify-center md:justify-end my-3 order-2 order-md-3">
        <Link
          href="/privacy-policy"
          className="text-gray-500 text-de"
          style={{ textDecoration: "none" }}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;
