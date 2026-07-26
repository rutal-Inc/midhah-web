import { MetadataRoute } from "next";
import { WEB_BASE_URL } from "../utilities/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private, auth-gated user collections.
        disallow: ["/collection/"],
      },
    ],
    sitemap: `${WEB_BASE_URL}/sitemap.xml`,
  };
}
