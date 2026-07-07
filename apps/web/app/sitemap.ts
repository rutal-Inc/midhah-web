import { MetadataRoute } from "next";
import { WEB_BASE_URL } from "../utilities/constants";

type SitemapRes = {
  lyrics: { genre: string; slug: string; updatedAt: string }[];
  poets: { slug: string; updatedAt: string }[];
};

const getSitemap = async (): Promise<SitemapRes | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sitemap`,
      {
        method: "GET",
        next: { revalidate: 3600 },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch sitemap: ${response.status} ${response.statusText}`,
      );
    }

    const res = await response.json();
    return res.data as SitemapRes;
  } catch (error) {
    console.error("Failed to fetch sitemap data:", error);
    return null;
  }
};

const STATIC_PAGES_LAST_MODIFIED = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapRes = await getSitemap();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: WEB_BASE_URL,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${WEB_BASE_URL}/hamd`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEB_BASE_URL}/naat`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEB_BASE_URL}/manqbat`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEB_BASE_URL}/durood-o-salam`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${WEB_BASE_URL}/trending`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEB_BASE_URL}/staff-picks`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${WEB_BASE_URL}/privacy-policy`,
      lastModified: STATIC_PAGES_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (!sitemapRes) {
    return staticPages;
  }

  const lyricsSitemap: MetadataRoute.Sitemap = sitemapRes.lyrics.flatMap(
    (lyric) => [
      {
        url: `${WEB_BASE_URL}/${lyric.genre}/${lyric.slug}`,
        lastModified: lyric.updatedAt,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${WEB_BASE_URL}/${lyric.genre}/${lyric.slug}/transliterated`,
        lastModified: lyric.updatedAt,
        changeFrequency: "weekly",
        priority: 1,
      },
    ],
  );

  const poetsSitemap: MetadataRoute.Sitemap = sitemapRes.poets.map((poet) => ({
    url: `${WEB_BASE_URL}/poets/${poet.slug}`,
    lastModified: poet.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...lyricsSitemap, ...poetsSitemap];
}
