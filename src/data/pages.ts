/**
 * Реестр страниц: добавьте строку slug (без префикса локали) — страница сгенерируется на RU/EN/KZ.
 * Кластер задаёт тематические блоки и LSI для генератора текста.
 */
export type ContentCluster =
  | "home"
  | "demo"
  | "play"
  | "strategy"
  | "win"
  | "payments"
  | "download"
  | "blog"
  | "reviews"
  | "howtoplay"
  | "howtowin"
  | "faq"
  | "analogs"
  | "platform";

export type PageDef = {
  /** Сегменты пути после локали, например ["demo","x-jet-demo"] */
  segments: string[];
  cluster: ContentCluster;
};

/** Якорные страницы + long-tail + платежи + блог. Новые slug — только сюда. */
export const PAGE_REGISTRY: PageDef[] = [
  { segments: ["demo"], cluster: "demo" },
  { segments: ["play"], cluster: "play" },
  { segments: ["reviews"], cluster: "reviews" },
  { segments: ["how-to-play"], cluster: "howtoplay" },
  { segments: ["how-to-win"], cluster: "howtowin" },
  { segments: ["strategy"], cluster: "strategy" },
  { segments: ["download"], cluster: "download" },
  { segments: ["faq"], cluster: "faq" },
  { segments: ["analogs"], cluster: "analogs" },
  { segments: ["privacy"], cluster: "faq" },
  { segments: ["terms"], cluster: "faq" },
  // demo long-tail
  { segments: ["demo", "x-jet-demo"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-free"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-no-registration"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-rubles"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-kzt"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-usd"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-mobile"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-android"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-ios"], cluster: "demo" },
  { segments: ["demo", "x-jet-demo-pc"], cluster: "demo" },
  // play
  { segments: ["play", "x-jet-play-online"], cluster: "play" },
  { segments: ["play", "x-jet-real-money"], cluster: "play" },
  { segments: ["play", "x-jet-no-registration"], cluster: "play" },
  { segments: ["play", "x-jet-without-download"], cluster: "play" },
  { segments: ["play", "x-jet-mobile"], cluster: "play" },
  { segments: ["play", "x-jet-android"], cluster: "play" },
  { segments: ["play", "x-jet-ios"], cluster: "play" },
  { segments: ["play", "x-jet-pc"], cluster: "play" },
  { segments: ["play", "x-jet-fast-play"], cluster: "play" },
  // strategy
  { segments: ["strategy", "x-jet-strategy"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-best-strategy"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-win-strategy"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-safe-strategy"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-high-risk"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-patterns"], cluster: "strategy" },
  { segments: ["strategy", "x-jet-algorithm"], cluster: "strategy" },
  // win
  { segments: ["win", "x-jet-how-to-win"], cluster: "win" },
  { segments: ["win", "x-jet-hack"], cluster: "win" },
  { segments: ["win", "x-jet-secret"], cluster: "win" },
  { segments: ["win", "x-jet-prediction"], cluster: "win" },
  { segments: ["win", "x-jet-signal"], cluster: "win" },
  { segments: ["win", "x-jet-system"], cluster: "win" },
  // payments
  { segments: ["payments", "visa"], cluster: "payments" },
  { segments: ["payments", "mastercard"], cluster: "payments" },
  { segments: ["payments", "bitcoin"], cluster: "payments" },
  { segments: ["payments", "usdt"], cluster: "payments" },
  { segments: ["payments", "ethereum"], cluster: "payments" },
  { segments: ["payments", "qiwi"], cluster: "payments" },
  { segments: ["payments", "skrill"], cluster: "payments" },
  { segments: ["payments", "neteller"], cluster: "payments" },
  { segments: ["payments", "apple-pay"], cluster: "payments" },
  { segments: ["payments", "google-pay"], cluster: "payments" },
  // download / platform
  { segments: ["android"], cluster: "platform" },
  { segments: ["ios"], cluster: "platform" },
  { segments: ["pc"], cluster: "platform" },
  { segments: ["apk"], cluster: "platform" },
  { segments: ["download", "x-jet-app"], cluster: "download" },
  { segments: ["download", "x-jet-mobile"], cluster: "download" },
  // blog
  { segments: ["blog", "x-jet-demo"], cluster: "blog" },
  { segments: ["blog", "x-jet-strategy-2026"], cluster: "blog" },
  { segments: ["blog", "x-jet-real-money"], cluster: "blog" },
  { segments: ["blog", "x-jet-aviator-compare"], cluster: "blog" },
  { segments: ["blog", "crash-game-guide"], cluster: "blog" },
  { segments: ["blog", "x-jet-rtp"], cluster: "blog" },
  { segments: ["blog", "x-jet-volatility"], cluster: "blog" },
  { segments: ["blog", "x-jet-is-it-rigged"], cluster: "blog" },
  { segments: ["blog", "x-jet-kazakhstan"], cluster: "blog" },
  { segments: ["blog", "x-jet-russia"], cluster: "blog" },
  { segments: ["blog", "x-jet-europe"], cluster: "blog" },
  { segments: ["blog", "best-crash-games"], cluster: "blog" },
  { segments: ["blog", "aviator-vs-xjet"], cluster: "blog" },
  { segments: ["blog", "x-jet-mistakes"], cluster: "blog" },
  { segments: ["blog", "x-jet-beginners"], cluster: "blog" },
];

export function pathKey(segments: string[]): string {
  return segments.join("/");
}

export function getPageDef(segments: string[]): PageDef | undefined {
  const key = pathKey(segments);
  return PAGE_REGISTRY.find((p) => pathKey(p.segments) === key);
}

/** Для перелинковки: все ключи кроме текущего */
export function allPathKeys(): string[] {
  return PAGE_REGISTRY.map((p) => pathKey(p.segments));
}
