import { siteConfig } from "@/data/site-config";

/**
 * Dynamic sitemap — generated at build time.
 * Includes the homepage and all anchor sections for discoverability.
 */
export default function sitemap() {
  const now = new Date();

  return [
    {
      url:             siteConfig.url,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        1.0,
    },
    {
      url:             `${siteConfig.url}/#about`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${siteConfig.url}/#projects`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${siteConfig.url}/#skills`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${siteConfig.url}/#journey`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${siteConfig.url}/#contact`,
      lastModified:    now,
      changeFrequency: "yearly",
      priority:        0.6,
    },
  ];
}
