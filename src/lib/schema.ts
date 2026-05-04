import { SITE_URL } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import type { FAQItem } from "@/lib/content-generator";

export function buildFaqJsonLd(url: string, faq: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url,
  };
}

export function buildArticleJsonLd(opts: {
  url: string;
  headline: string;
  description: string;
  locale: Locale;
  dateModified: string;
  wordCount: number;
}) {
  const inLanguage = opts.locale === "kz" ? "kk" : opts.locale;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage,
    dateModified: opts.dateModified,
    author: {
      "@type": "Organization",
      name: "X Jet Game",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "X Jet Game",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
    wordCount: opts.wordCount,
  };
}
