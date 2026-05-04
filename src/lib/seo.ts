import type { ContentCluster } from "@/data/pages";
import type { Locale } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
};

const suffix: Record<Locale, string> = {
  ru: "X Jet",
  en: "X Jet",
  kz: "X Jet",
};

const templates: Record<
  Locale,
  Record<ContentCluster, { title: (p: string) => string; desc: (p: string) => string }>
> = {
  ru: {
    home: {
      title: (_p) => "X Jet: играть в краш‑игру онлайн — демо, стратегии, платежи",
      desc: (_p) =>
        "X Jet — динамичная crash game с множителем и коэффициентом. Демо, советы по ставке, вывод денег и ответственная игра в онлайн казино.",
    },
    demo: {
      title: (p) => `${humanPath(p)} — демо X Jet, краш‑игра и множитель`,
      desc: (p) =>
        `Материал «${p}»: демо X Jet, как читать коэффициент, ставку и интерфейс crash game. Практика без обещаний «гарантированного выигрыша» в онлайн казино.`,
    },
    play: {
      title: (p) => `${humanPath(p)} — играть в X Jet онлайн на деньги`,
      desc: (p) =>
        `Страница «${p}»: запуск X Jet, ставка, кэшаут, риски дисперсии и вывод денег. Полезно перед сессией в лицензированном онлайн казино.`,
    },
    strategy: {
      title: (p) => `${humanPath(p)} — стратегии X Jet и управление риском`,
      desc: (p) =>
        `«${p}»: стратегии для crash game — дисциплина, лимиты, множитель и коэффициент. Без «хаков», с фокусом на ответственную игру.`,
    },
    win: {
      title: (p) => `${humanPath(p)} — выигрыш в X Jet: мифы и реальность`,
      desc: (p) =>
        `Тема «${p}»: что реально влияет на результат в X Jet, почему «сигналы» опасны, и как думать о ставке и выводе денег.`,
    },
    payments: {
      title: (p) => `${humanPath(p)} — платежи X Jet и вывод в онлайн казино`,
      desc: (p) =>
        `Платежный сценарий «${p}» для X Jet: депозит, комиссии, лимиты и вывод денег. Сравнение удобства методов для crash game.`,
    },
    download: {
      title: (p) => `${humanPath(p)} — скачать/запустить X Jet безопасно`,
      desc: (p) =>
        `«${p}»: приложение, мобильная версия, APK‑риски и стабильность кэшаута в X Jet. Проверяйте официальные источники онлайн казино.`,
    },
    blog: {
      title: (p) => `${humanPath(p)} — блог X Jet: crash game, RTP, сравнения`,
      desc: (p) =>
        `Блог‑страница «${p}»: аналитика про множитель, волатильность, сравнение с Aviator и практические заметки для онлайн казино.`,
    },
    reviews: {
      title: (_p) => "Отзывы о X Jet — краш‑игра, выплаты, мобильная версия",
      desc: (_p) =>
        "Как читать отзывы о X Jet: на что смотреть в темах вывода денег, поддержки и стабильности crash game в онлайн казино.",
    },
    howtoplay: {
      title: (_p) => "Как играть в X Jet — правила, ставка, коэффициент, кэшаут",
      desc: (_p) =>
        "Пошагово про X Jet: старт раунда, множитель, фиксация выигрыша и типичные ошибки новичков в краш‑игре онлайн казино.",
    },
    howtowin: {
      title: (_p) => "Как выигрывать в X Jet — дисциплина, лимиты, банкролл",
      desc: (_p) =>
        "Здравый смысл про «как выиграть» в crash game: лимиты сессии, стоп‑лосс, вывод денег и отказ от опасных «систем».",
    },
    faq: {
      title: (_p) => "FAQ X Jet — вопросы по демо, ставкам и выводу денег",
      desc: (_p) =>
        "Ответы на частые вопросы о X Jet: демо, множитель, коэффициент, вывод средств и ответственная игра в онлайн казино.",
    },
    analogs: {
      title: (_p) => "Аналоги X Jet — другие crash game и что сравнивать",
      desc: (_p) =>
        "Сравнение аналогов X Jet: лицензия, репутация выплат, UX и правила — важнее визуала самолёта и рекламы множителя.",
    },
    platform: {
      title: (p) => `${humanPath(p)} — X Jet на Android, iOS, PC`,
      desc: (p) =>
        `«${p}»: установка, обновления, безопасность APK и стабильность сети для кэшаута в X Jet.`,
    },
  },
  en: {
    home: {
      title: (_p) => "X Jet crash game online — demo, strategies, payments",
      desc: (_p) =>
        "Play X Jet responsibly: crash game mechanics, multiplier & coefficient context, bet guidance, withdrawals, and licensed online casino notes.",
    },
    demo: {
      title: (p) => `${humanPath(p)} — X Jet demo & crash game tutorial`,
      desc: (p) =>
        `Guide for “${p}”: X Jet demo, UI timing, coefficient reading, and bet basics — entertainment-first, no “guaranteed profit” claims.`,
    },
    play: {
      title: (p) => `${humanPath(p)} — play X Jet for real money (responsible)`,
      desc: (p) =>
        `Page “${p}”: real-money play notes for X Jet — cash-out discipline, variance, withdrawals, and online casino diligence.`,
    },
    strategy: {
      title: (p) => `${humanPath(p)} — X Jet strategies & bankroll risk control`,
      desc: (p) =>
        `“${p}”: practical risk framing for crash games — limits, stop-loss, multipliers — avoiding hack/signal scams.`,
    },
    win: {
      title: (p) => `${humanPath(p)} — winning myths vs reality in X Jet`,
      desc: (p) =>
        `“${p}”: what players can control in X Jet, why “prediction” fails, and how to think about bets and withdrawals.`,
    },
    payments: {
      title: (p) => `${humanPath(p)} — X Jet payments & withdrawals`,
      desc: (p) =>
        `Payments angle “${p}” for X Jet: fees, limits, KYC, and cash-out timelines in licensed online casinos.`,
    },
    download: {
      title: (p) => `${humanPath(p)} — download / launch X Jet safely`,
      desc: (p) =>
        `“${p}”: official apps, mobile web, APK risks, and stable cash-outs for crash sessions.`,
    },
    blog: {
      title: (p) => `${humanPath(p)} — X Jet blog: RTP, volatility, Aviator`,
      desc: (p) =>
        `Blog page “${p}”: crash game education — multiplier concepts, volatility, Aviator comparisons, responsible play.`,
    },
    reviews: {
      title: (_p) => "X Jet reviews — payouts, mobile, support signals",
      desc: (_p) =>
        "How to read X Jet reviews critically: withdrawal evidence, support quality, and mobile stability for crash games.",
    },
    howtoplay: {
      title: (_p) => "How to play X Jet — bets, coefficient, cash-out",
      desc: (_p) =>
        "Beginner-friendly X Jet walkthrough: round flow, multiplier growth, cash-out timing, and common UI mistakes.",
    },
    howtowin: {
      title: (_p) => "How to win at X Jet — discipline, not shortcuts",
      desc: (_p) =>
        "Responsible framing: session caps, stop-loss, withdrawals, and why “systems” do not change RNG outcomes.",
    },
    faq: {
      title: (_p) => "X Jet FAQ — demo, limits, withdrawals",
      desc: (_p) =>
        "Frequently asked questions about X Jet crash game: demo access, bet limits, withdrawals, and safer play habits.",
    },
    analogs: {
      title: (_p) => "Games like X Jet — what to compare in crash titles",
      desc: (_p) =>
        "Compare Aviator-like crash games by license, payout reputation, and rules — not hype about multipliers alone.",
    },
    platform: {
      title: (p) => `${humanPath(p)} — X Jet on Android, iOS, PC`,
      desc: (p) =>
        `“${p}”: platform tips for X Jet — updates, sideload risks, and network stability for cash-outs.`,
    },
  },
  kz: {
    home: {
      title: (_p) => "X Jet — crash ойыны: демо, стратегия, төлемдер",
      desc: (_p) =>
        "X Jet туралы нұсқау: crash game, multiplier, coefficient, ставка, ақша шығару және жауапты ойын.",
    },
    demo: {
      title: (p) => `${humanPath(p)} — X Jet демо және интерфейс`,
      desc: (p) =>
        `«${p}» беті: X Jet демо, коэффициент пен ставканы оқу, crash game тәжірибесі.`,
    },
    play: {
      title: (p) => `${humanPath(p)} — X Jet нақты ақшаға ойнау`,
      desc: (p) =>
        `«${p}»: X Jet сессиясы, cash-out, дисперсия және онлайн казино шығару ережелері.`,
    },
    strategy: {
      title: (p) => `${humanPath(p)} — X Jet стратегиясы мен тәуекелді басқару`,
      desc: (p) =>
        `«${p}» такырыбы: лимиттер, стоп-лосс, multiplier — «хак» схемаларынан аулақ.`,
    },
    win: {
      title: (p) => `${humanPath(p)} — X Jet ұтысы: миф пен шындық`,
      desc: (p) =>
        `«${p}»: болжам мифтері, нақты бақылау құралдары, ставка мен шығару.`,
    },
    payments: {
      title: (p) => `${humanPath(p)} — X Jet төлемдері мен шығару`,
      desc: (p) =>
        `«${p}» төлемі: комиссия, лимит, KYC және crash ойыны үшін ыңғайлылық.`,
    },
    download: {
      title: (p) => `${humanPath(p)} — X Jet жүктеп алу/қосу`,
      desc: (p) =>
        `«${p}»: ресми қолданба, APK қаупі, мобильді тұрақтылық.`,
    },
    blog: {
      title: (p) => `${humanPath(p)} — X Jet блогы: RTP, volatility`,
      desc: (p) =>
        `«${p}» блогы: crash game түсініктемелері, Aviator салыстыру, жауапты ойын.`,
    },
    reviews: {
      title: (_p) => "X Jet пікірлері — шығару, мобильді, қолдау",
      desc: (_p) =>
        "X Jet шолуларын сүзу: нақты шығару фактілері мен crash ойыны тұрақтылығы.",
    },
    howtoplay: {
      title: (_p) => "X Jet қалай ойнайды — ставка, коэффициент, cash-out",
      desc: (_p) =>
        "X Jet қадамдары: раунд, көбейткіш, уақытында cash-out және қателер.",
    },
    howtowin: {
      title: (_p) => "X Jet қалай «ұтуға» болады — тәртіп пен лимит",
      desc: (_p) =>
        "Жауапты рамка: сессия шегі, стоп-лосс, ақша шығару — RNG «жеңу жүйесі» емес.",
    },
    faq: {
      title: (_p) => "X Jet FAQ — демо, лимит, шығару",
      desc: (_p) =>
        "X Jet жайлы жиі сұрақтар: демо, ставка, коэффициент, ақша шығару.",
    },
    analogs: {
      title: (_p) => "X Jet аналогтары — crash ойындарды салыстыру",
      desc: (_p) =>
        "Лицензия, төлем беделі, ережелер — тек визуал емес.",
    },
    platform: {
      title: (p) => `${humanPath(p)} — X Jet Android/iOS/PC`,
      desc: (p) =>
        `«${p}»: платформа кеңестері, жаңарту, APK қаупі.`,
    },
  },
};

function humanPath(path: string): string {
  return path.replaceAll("/", " · ");
}

export function buildSeo(
  locale: Locale,
  cluster: ContentCluster,
  slugPath: string,
): SeoMeta {
  if (slugPath === "privacy") {
    const pack =
      locale === "ru"
        ? {
            title: "Политика конфиденциальности — X Jet Game",
            desc: "Как обрабатываются данные на сайте x-jet-game.vercel.app: cookies, аналитика, партнёрские ссылки и ответственная игра 18+.",
          }
        : locale === "en"
          ? {
              title: "Privacy Policy — X Jet Game",
              desc: "Privacy notes for x-jet-game.vercel.app: cookies, analytics, affiliate links, and 18+ responsible gambling disclaimer.",
            }
          : {
              title: "Құпиялылық саясаты — X Jet Game",
              desc: "x-jet-game.vercel.app үшін деректер, cookie, аналитика және 18+ жауапты ойын ескертулері.",
            };
    return {
      title: pack.title,
      description: pack.desc.slice(0, 160),
      canonical: `${SITE_URL}/${locale}/privacy/`,
    };
  }
  if (slugPath === "terms") {
    const pack =
      locale === "ru"
        ? {
            title: "Условия использования — X Jet Game",
            desc: "Правовая информация и ограничение ответственности: развлекательный контент, 18+, партнёрские переходы и отсутствие гарантий выигрыша.",
          }
        : locale === "en"
          ? {
              title: "Terms of Service — X Jet Game",
              desc: "Legal disclaimer: entertainment content, 18+, affiliate outbound links, no warranties on gambling outcomes.",
            }
          : {
              title: "Қызмет көрсету шарттары — X Jet Game",
              desc: "Құқықтық ескерту: ойын-сауық контенті, 18+, серіктес сілтемелері, ұтыс кепілдігі жоқ.",
            };
    return {
      title: pack.title,
      description: pack.desc.slice(0, 160),
      canonical: `${SITE_URL}/${locale}/terms/`,
    };
  }

  const t = templates[locale][cluster];
  const titleBase = t.title(slugPath);
  const title = `${titleBase} | ${suffix[locale]}`.slice(0, 90);
  const description = t.desc(slugPath).slice(0, 160);
  const canonical =
    slugPath === "" ? `${SITE_URL}/${locale}/` : `${SITE_URL}/${locale}/${slugPath}/`;

  return { title, description, canonical };
}
