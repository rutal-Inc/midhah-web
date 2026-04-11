import { WEB_BASE_URL } from "@/src/utilities/constants";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  const title = `Privacy Policy | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  return {
    title,
    openGraph: {
      title,
    },
    twitter: {
      title,
    },
    alternates: {
      canonical: `${WEB_BASE_URL}/privacy-policy`,
    },
  };
}

const Privacy = () => {
  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg relative overflow-hidden p-3 py-5 md:p-5">
        <div className="py-[60px] text-center text-white md:py-[150px]">
          <h1 className="mb-1 text-2xl md:text-5xl">Privacy Policy</h1>
          <p className="text-normal md:text-xl">
            We ensure, your Data is Secure
          </p>
        </div>
        <p className="fs-6 text-end font-light text-slate-200">
          <small>Last Updated April 11, 2026</small>
        </p>
      </div>

      <div className="justify-content container p-5">
        <p className="text-normal mb-4 p-1 leading-relaxed">
          Rutal Labs built the Midhah Lyrics app as a Free app. This SERVICE is
          provided by Rutal Labs at no cost and is intended for use as is.
          <br />
          This page is used to inform visitors regarding my policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use my Service.
          <br />
          If you choose to use my Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that we collect is used for providing and improving the
          Service. We will not use or share your information with anyone except
          as described in this Privacy Policy.
          <br />
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which are accessible at Midhah Lyrics unless
          otherwise defined in this Privacy Policy are following:
        </p>
        <div
          id="information-collection-and-use"
          className="mb-4 p-1 leading-relaxed"
        >
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Information Collection and Use{" "}
            <a
              href="#information-collection-and-use"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>

          <p>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information. The
            information that we request will be retained on your device and is
            not collected by me in any way.
            <br />
            The app does use third-party services that may collect information
            used to identify you.
            <br />
            Link to the privacy policy of third-party service providers used by
            the app
          </p>
          <ul className="list-disc pl-10">
            <li>
              <a
                href="https://policies.google.com/privacy"
                className="underline"
              >
                Google Play Services
              </a>
            </li>
          </ul>
        </div>

        <div id="log-data" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Log Data{" "}
            <a
              href="#log-data"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>
          <p>
            We want to inform you that whenever you use my Service, in a case of
            an error in the app We collect data and information (through
            third-party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (IP)
            address, device name, operating system version, the configuration of
            the app when utilizing my Service, the time and date of your use of
            the Service, and other statistics.
          </p>
        </div>
        <div id="cookies" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Cookies{" "}
            <a
              href="#cookies"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>
          <p>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device&rsquo;s
            internal memory.
            <br />
            This Service does not use these “cookies” explicitly. However, the
            app may use third-party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </p>
        </div>

        <div id="service-providers" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Service Providers{" "}
            <a
              href="#service-providers"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>
          <p>
            We may employ third-party companies and individuals due to the
            following reasons:
          </p>
          <ul className="list-disc pl-10">
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used</li>
          </ul>
          <p>
            We want to inform users of this Service that these third parties
            have access to their Personal Information. The reason is to perform
            the tasks assigned to them on our behalf. However, they are
            obligated not to disclose or use the information for any other
            purpose.
          </p>
        </div>

        <div id="security" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Security{" "}
            <a
              href="#security"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>
          <p>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </p>
        </div>

        <div id="link-to-other-sites" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            Links to Other Sites{" "}
            <a
              href="#link-to-other-sites"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>
          <p>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, We strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>
        </div>

        <div id="user-data-deletion" className="mb-4 p-1 leading-relaxed">
          <h3 className="group relative mb-2 text-2xl md:text-4xl">
            {`User Data Deletion Request (Your "Right to be Forgotten")`}{" "}
            <a
              href="#user-data-deletion"
              className="text-cyan-600 opacity-0 group-hover:opacity-100 hover:underline"
            >
              #
            </a>
          </h3>

          <p>
            We respect your privacy and your control over your personal
            information. If you have created an account or submitted any
            personal data through the Midhah Lyrics website and mobile
            application, you have the right to request permanent deletion of
            your data.
          </p>

          <p className="mt-2">
            <strong>How to Request Data Deletion:</strong>
          </p>

          <p>
            Send a deletion request from your registered email address to our
            support team at:{" "}
            <a
              className="font-semibold"
              href="mailto:hello@rutal.net?subject=Data%20Deletion%20Request%20-%20Midhah%20Lyrics"
            >
              hello@rutal.net
            </a>
          </p>

          <p className="mt-2">
            Please include the following details in your email:
          </p>

          <ul className="list-disc pl-10">
            <li>{`Subject Line: "Data Deletion Request - Midhah Lyrics"`}</li>
            <li>Your registered email address or username</li>
          </ul>

          <p className="mt-2">
            <strong>What Happens After You Request:</strong>
          </p>

          <ul className="list-disc pl-10">
            <li>
              Your account and all associated personal data will be permanently
              deleted from our active databases within 30 days of verification.
            </li>
            <li>
              Any stored preferences, search history, or user-generated
              collections linked to your account will be removed.
            </li>
            <li>
              We may retain anonymized or aggregated data that cannot be used to
              identify you personally.
            </li>
          </ul>

          <p className="mt-2">
            <strong>Important Notes:</strong>
          </p>

          <ul className="list-disc pl-10">
            <li>Data deletion is permanent and cannot be undone.</li>
            <li>
              If you reinstall the app and create a new account, it will be
              treated as a new user.
            </li>
            <li>
              Some data may remain in backup systems for a limited period (up to
              90 days) before being fully purged according to our data retention
              practices.
            </li>
          </ul>

          <p className="mt-2">
            <strong>Contact Us:</strong>
          </p>

          <p>
            For any questions or assistance regarding data deletion, contact us
            at: <a href="mailto:hello@rutal.net">hello@rutal.net</a>
          </p>

          <p>
            Response Time: We aim to respond to all deletion requests within 7
            business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
