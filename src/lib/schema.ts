import { SITE_URL } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import type { FAQItem } from "@/lib/content-generator";

type SchemaImage = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

function language(locale: Locale): string {
  return locale === "kz" ? "kk" : locale;
}

function breadcrumbName(segment: string): string {
  return segment
    .replaceAll("-", " ")
    .replaceAll("x jet", "X Jet")
    .replaceAll("lucky jet", "Lucky Jet");
}

export function buildFaqJsonLd(url: string, faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url,
    isPartOf: { "@id": `${url}#webpage` },
  };
}

export function buildArticleJsonLd(opts: {
  url: string;
  headline: string;
  description: string;
  locale: Locale;
  dateModified: string;
  wordCount: number;
  images?: string[];
}) {
  const inLanguage = language(opts.locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    inLanguage,
    dateModified: opts.dateModified,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${opts.url}#webpage` },
    image: opts.images?.map(absoluteUrl),
    wordCount: opts.wordCount,
  };
}

export function buildPageGraphJsonLd(opts: {
  url: string;
  title: string;
  description: string;
  locale: Locale;
  slugPath: string;
  images?: SchemaImage[];
}) {
  const inLanguage = language(opts.locale);
  const homeName = opts.locale === "ru" ? "Главная" : opts.locale === "kz" ? "Басты бет" : "Home";
  const baseUrl = `${SITE_URL}/${opts.locale}/`;
  const parts = opts.slugPath ? opts.slugPath.split("/").filter(Boolean) : [];
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName,
      item: baseUrl,
    },
    ...parts.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: breadcrumbName(segment),
      item: `${baseUrl}${parts.slice(0, index + 1).join("/")}/`,
    })),
  ];

  const imageNodes = (opts.images ?? []).map((image, index) => ({
    "@type": "ImageObject",
    "@id": `${opts.url}#image-${index + 1}`,
    contentUrl: absoluteUrl(image.src),
    url: absoluteUrl(image.src),
    name: image.title,
    description: image.alt,
    caption: image.caption,
    width: image.width,
    height: image.height,
    inLanguage,
    representativeOfPage: index === 0,
  }));

  const primaryImage = imageNodes[0] ? { "@id": imageNodes[0]["@id"] } : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Lucky Jet / X Jet Guide",
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: opts.locale === "ru" ? "Lucky Jet Guide" : "X Jet Game",
        inLanguage,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${opts.url}#breadcrumb`,
        itemListElement: breadcrumbs,
      },
      {
        "@type": "WebPage",
        "@id": `${opts.url}#webpage`,
        url: opts.url,
        name: opts.title,
        description: opts.description,
        inLanguage,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${opts.url}#breadcrumb` },
        primaryImageOfPage: primaryImage,
        about: {
          "@type": "Thing",
          name: opts.locale === "ru" ? "Lucky Jet / Лаки Джет" : "X Jet",
        },
      },
      ...imageNodes,
    ],
  };
}
