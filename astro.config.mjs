import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const site = "https://x-jet-game.vercel.app";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: "ru",
        locales: {
          ru: "ru",
          en: "en",
          kz: "kz",
        },
      },
    }),
  ],
  compressHTML: true,
});
