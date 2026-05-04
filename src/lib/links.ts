import { allPathKeys } from "@/data/pages";
import type { Locale } from "@/lib/constants";
import { mulberry32, shuffle, takeUnique } from "@/lib/seed";

export type NavLink = { href: string; label: string };

const labels: Record<Locale, Record<string, string>> = {
  ru: {
    "": "Главная",
    demo: "Демо",
    play: "Играть",
    strategy: "Стратегии",
    reviews: "Отзывы",
    "how-to-play": "Как играть",
    "how-to-win": "Как выиграть",
    download: "Скачать",
    faq: "FAQ",
    analogs: "Аналоги",
    blog: "Блог",
    payments: "Платежи",
    win: "Выигрыш",
    android: "Android",
    ios: "iOS",
    pc: "PC",
    apk: "APK",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
  },
  en: {
    "": "Home",
    demo: "Demo",
    play: "Play",
    strategy: "Strategy",
    reviews: "Reviews",
    "how-to-play": "How to play",
    "how-to-win": "How to win",
    download: "Download",
    faq: "FAQ",
    analogs: "Analogs",
    blog: "Blog",
    payments: "Payments",
    win: "Win",
    android: "Android",
    ios: "iOS",
    pc: "PC",
    apk: "APK",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  kz: {
    "": "Басты бет",
    demo: "Демо",
    play: "Ойнау",
    strategy: "Стратегия",
    reviews: "Пікірлер",
    "how-to-play": "Қалай ойнайды",
    "how-to-win": "Қалай ұтады",
    download: "Жүктеу",
    faq: "FAQ",
    analogs: "Аналогтар",
    blog: "Блог",
    payments: "Төлемдер",
    win: "Ұтыс",
    android: "Android",
    ios: "iOS",
    pc: "PC",
    apk: "APK",
    privacy: "Құпиялылық саясаты",
    terms: "Қызмет көрсету шарттары",
  },
};

function labelFor(locale: Locale, pathKeyStr: string): string {
  const first = pathKeyStr.split("/")[0] ?? pathKeyStr;
  const map = labels[locale];
  return map[pathKeyStr] ?? map[first] ?? pathKeyStr.replaceAll("-", " ");
}

export function hrefLocale(locale: Locale, pathKey: string): string {
  if (pathKey === "") return `/${locale}/`;
  return `/${locale}/${pathKey}/`;
}

/** Главная, demo, play, strategy + 3–5 случайных (детерминированно от slug) */
export function buildInternalLinks(locale: Locale, currentKey: string): NavLink[] {
  const seed =
    [...currentKey].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 7) +
    (locale === "ru" ? 1 : locale === "en" ? 2 : 3);
  const rng = mulberry32(seed);

  const required = ["", "demo", "play", "strategy"]
    .filter((k) => k !== currentKey)
    .map((k) => ({ href: hrefLocale(locale, k), label: labelFor(locale, k) }));

  const pool = shuffle(rng, allPathKeys().filter((k) => k !== currentKey && !["", "demo", "play", "strategy"].includes(k)));
  const n = 3 + Math.floor(rng() * 3);
  const extra = takeUnique(rng, pool, n).map((k) => ({
    href: hrefLocale(locale, k),
    label: labelFor(locale, k),
  }));

  const map = new Map<string, NavLink>();
  for (const x of [...required, ...extra]) map.set(x.href, x);
  return [...map.values()];
}
