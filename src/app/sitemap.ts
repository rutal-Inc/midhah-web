import { MetadataRoute } from "next";
import { WEB_BASE_URL } from "../utilities/constants";

type SitemapRes = { slug: string; updatedAt: Date };

const getSitemap = async () => {
  const res = await fetch(`https://api.midhah.com/v2/sitemap`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });

  return res.data as SitemapRes[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapRes = await getSitemap();

  const sitemap: MetadataRoute.Sitemap = sitemapRes.map((sitemap) => ({
    url: `${WEB_BASE_URL}/${sitemap.slug}`,
    lastModified: sitemap.updatedAt,
  }));

  return [
    {
      url: WEB_BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${WEB_BASE_URL}/hamd`,
      lastModified: new Date(),
    },
    {
      url: `${WEB_BASE_URL}/naat`,
      lastModified: new Date(),
    },
    {
      url: `${WEB_BASE_URL}/manqbat`,
      lastModified: new Date(),
    },
    {
      url: `${WEB_BASE_URL}/durood-o-salam`,
      lastModified: new Date(),
    },
    {
      url: `${WEB_BASE_URL}/privacy-policy`,
      lastModified: new Date(),
    },
    ...sitemap,
  ];
}
