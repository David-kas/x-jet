export const SITE_URL = "https://x-jet-game.vercel.app";
export const AFFILIATE_URL =
  "https://h0xhaw0za1kg7e.xyz/click/6979c7c96bcc6364c87500ce/7/16899/subaccount";

export const LOCALES = ["ru", "en", "kz"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  kz: "Қазақша",
};
