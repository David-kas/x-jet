import type { ContentCluster } from "@/data/pages";
import type { Locale } from "@/lib/constants";
import { mulberry32, shuffle, takeUnique } from "@/lib/seed";
import { ruCommon, ruCluster } from "@/lib/wordbanks/ru";
import { enCommon, enCluster } from "@/lib/wordbanks/en";
import { kzCommon, kzCluster } from "@/lib/wordbanks/kz";

export type ArticleSection = {
  id: string;
  title: string;
  html: string;
};

export type FAQItem = { question: string; answer: string };

export type GeneratedArticle = {
  sections: ArticleSection[];
  faq: FAQItem[];
  similarQueries: string[];
  wordCount: number;
};

function wordCount(text: string): number {
  return text
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function banksFor(locale: Locale) {
  if (locale === "ru") return { common: ruCommon, cluster: ruCluster };
  if (locale === "en") return { common: enCommon, cluster: enCluster };
  return { common: kzCommon, cluster: kzCluster };
}

function mergePools(cluster: ContentCluster, locale: Locale): string[] {
  const { common, cluster: cmap } = banksFor(locale);
  const extra = cmap[cluster] ?? cmap.home ?? [];
  return shuffle(mulberry32(seedFrom(cluster + locale)), [...common, ...extra]);
}

function seedFrom(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function sectionTitles(locale: Locale, cluster: ContentCluster, slugPath: string): string[] {
  const p = slugPath;
  if (locale === "ru") {
    return [
      `X Jet (${p}): краш‑игра, множитель и коэффициент`,
      `Ставка, сессия и вывод денег в онлайн казино`,
      `Практические заметки по дисперсии и дисциплине`,
      `Сравнение подходов: низкий коэффициент vs высокий риск`,
      `Мобильный опыт, сеть и стабильность кэшаута`,
      `Ответственная игра и гигиена банкролла`,
      `Платежи, лимиты и проверка правил оператора`,
      `Мифы, «сигналы» и реальная механика crash game`,
    ];
  }
  if (locale === "en") {
    return [
      `X Jet (${p}): crash game mechanics — multiplier & coefficient`,
      `Bet sizing, sessions, and withdrawals at online casinos`,
      `Variance notes: discipline beats “lucky timing”`,
      `Styles: early cash-out vs high-risk attempts`,
      `Mobile latency, UX, and cash-out reliability`,
      `Responsible gambling and bankroll hygiene`,
      `Payments, limits, and reading operator rules`,
      `Myths vs reality: predictions, “hacks”, and RNG`,
    ];
  }
  return [
    `X Jet (${p}): crash game, multiplier жəне coefficient`,
    `Ставка, сессия жəне онлайн казино арқылы ақша шығару`,
    `Дисперсия жəне тəртіп туралы қысқаша нұсқау`,
    `Тəсілдер: ерте cash-out пен жоғары тәуекел`,
    `Мобильді кідіріс пен интерфейс сенімділігі`,
    `Жауапты ойын жəне банкролл гигиенасы`,
    `Төлемдер, лимиттер жəне ережелерді оқу`,
    `Мифтер: болжам, «хак» жəне RNG шындығы`,
  ];
}

function buildFAQ(locale: Locale, cluster: ContentCluster, slugPath: string): FAQItem[] {
  const path = slugPath;
  if (locale === "ru") {
    return [
      {
        question: `Что такое X Jet и чем отличается страница «${path}»?`,
        answer: `X Jet — краш‑игра с растущим множителем; эта страница собирает практические акценты по теме «${path}»: ставка, коэффициент, вывод денег и контекст онлайн казино без обещаний «гарантированной прибыли».`,
      },
      {
        question: `Можно ли предсказать краш по истории множителей?`,
        answer: `Нет надёжного способа предсказать исход раунда по графику истории. Прошлые коэффициенты не задают будущий краш; полезнее лимиты и ответственная игра.`,
      },
      {
        question: `Как работает кэшаут и что такое коэффициент?`,
        answer: `Коэффициент показывает, во сколько раз может вырасти выплата относительно ставки, если вы успели зафиксировать выигрыш. Если раунд оборвался раньше — ставка проиграна в рамках правил провайдера.`,
      },
      {
        question: `Что важно для вывода денег после сессии?`,
        answer: `Проверьте KYC, лимиты метода, комиссии и сроки. Не смешивайте «горячую серию» с попыткой мгновенно вывести крупную сумму без подготовки документов.`,
      },
      {
        question: `Есть ли безопасная стратегия для crash game?`,
        answer: `«Безопаснее» можно управлять только риском: маленькая ставка, ранний кэшаут, стоп‑лосс и паузы. Это не убирает математическую неопределённость онлайн казино.`,
      },
    ];
  }
  if (locale === "en") {
    return [
      {
        question: `What is X Jet, and what does this page (“${path}”) focus on?`,
        answer: `X Jet is a crash game with a rising multiplier. This guide emphasizes practical angles for “${path}”: bets, coefficients, withdrawals, and licensed online casino context — not income guarantees.`,
      },
      {
        question: `Can multiplier history predict the next crash?`,
        answer: `No reliable method turns history into a forecast. Past coefficients do not bind future outcomes; use limits and responsible gambling tools instead.`,
      },
      {
        question: `How do cash-out and coefficient work?`,
        answer: `The coefficient scales potential payout relative to your stake if you cash out in time. If the round ends before you cash out, the stake is lost per operator rules.`,
      },
      {
        question: `What matters for withdrawals?`,
        answer: `KYC readiness, method limits, fees, and timelines. Avoid impulsive redeposits immediately after wins; plan cash-out steps calmly.`,
      },
      {
        question: `Is there a “safe” crash strategy?`,
        answer: `You can only manage risk: smaller stakes, earlier cash-outs, stop-loss, breaks. That reduces volatility feel, not randomness.`,
      },
    ];
  }
  return [
    {
      question: `X Jet дегеніміз не, «${path}» беті нені қамтиды?`,
      answer: `X Jet — көбейткіші өсетін crash ойыны; бұл материал «${path}» тақырыбындағы практикалық жақтарды қамтиды: ставка, коэффициент, ақша шығару жəне лицензиялы онлайн казино контексті.`,
    },
    {
      question: `Тарих бойынша келесі крашты болжауға бола ма?`,
      answer: `Жоқ — тарих болжам емес. Өткен коэффициенттер болашақты міндеттемейді; лимиттер мен жауапты ойын құралдарына сүйеніңіз.`,
    },
    {
      question: `Cash-out пен коэффициент қалай жұмыс істейді?`,
      answer: `Коэффициент ставкаға қатысты әлеуетті төлемді көрсетеді; уақытында cash-out жасасаңыз, ұтыс сақталады. Раунд ерте аяқталса, ережеге сай ставка жоғалуы мүмкін.`,
    },
    {
      question: `Ақша шығару үшін не маңызды?`,
      answer: `KYC дайындығы, әдіс лимиттері, комиссия мен мерзімдер. Ұтыстан кейін дереу қайта депозит жасамаңыз.`,
    },
    {
      question: `Crash ойынына «қауіпсіз» стратегия бар ма?`,
      answer: `Тек тәуекелді басқаруға болады: кіші ставка, ерте cash-out, стоп-лосс, үзіліс. Бұл дисперсияны басқару, кездейсоқтықты жою емес.`,
    },
  ];
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs.map((t) => `<p>${t}</p>`).join("\n");
}

export function generateArticle(
  locale: Locale,
  cluster: ContentCluster,
  slugPath: string,
): GeneratedArticle {
  const seed = seedFrom(`${locale}::${cluster}::${slugPath}`);
  const rng = mulberry32(seed);
  const pool = shuffle(rng, mergePools(cluster, locale));

  const titles = shuffle(rng, sectionTitles(locale, cluster, slugPath));

  const minWords = 1200;
  const maxWords = 2000;

  const sections: ArticleSection[] = [];
  let pi = 0;
  const takeParas = (n: number): string[] => {
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
      out.push(pool[pi % pool.length]!);
      pi++;
    }
    return out;
  };

  const allText = () => sections.map((s) => s.title + " " + s.html).join(" ");

  let s = 0;
  while (wordCount(allText()) < minWords && sections.length < 18) {
    const paras = takeParas(2 + Math.floor(rng() * 3));
    const h3Needed = rng() > 0.35 && paras.length > 2;
    let html = paragraphsToHtml(h3Needed ? paras.slice(0, 2) : paras);
    if (h3Needed) {
      const h3 =
        locale === "ru"
          ? `Подраздел: ставка, множитель и онлайн казино`
          : locale === "en"
            ? `Subtopic: bet, multiplier, online casino context`
            : `Қосымша: ставка, multiplier, онлайн казино`;
      html += `\n<h3 class="text-xl font-semibold text-white mt-8 mb-3">${h3}</h3>\n`;
      html += paragraphsToHtml(paras.slice(2));
    }
    sections.push({
      id: `sec-${++s}`,
      title: titles[(s - 1) % titles.length]!,
      html,
    });
  }

  while (wordCount(allText()) > maxWords && sections.length > 6) {
    sections.pop();
  }

  const wc = wordCount(allText());
  const faq = buildFAQ(locale, cluster, slugPath);

  const similarQueries = buildSimilarQueries(locale, slugPath, cluster, rng);

  return { sections, faq, similarQueries, wordCount: wc };
}

function buildSimilarQueries(
  locale: Locale,
  slugPath: string,
  cluster: ContentCluster,
  rng: () => number,
): string[] {
  const base =
    locale === "ru"
      ? [
          `X Jet ${slugPath} демо`,
          `X Jet ${slugPath} играть онлайн`,
          `краш игра X Jet коэффициент`,
          `множитель X Jet как работает`,
          `ставка X Jet стратегия`,
          `вывод денег X Jet`,
          `онлайн казино X Jet отзывы`,
        ]
      : locale === "en"
        ? [
            `X Jet ${slugPath} demo`,
            `X Jet ${slugPath} play online`,
            `X Jet crash game multiplier`,
            `coefficient X Jet explained`,
            `bet strategy X Jet`,
            `withdraw money X Jet`,
            `online casino X Jet reviews`,
          ]
        : [
            `X Jet ${slugPath} демо`,
            `X Jet ${slugPath} ойнау`,
            `X Jet crash game multiplier`,
            `coefficient X Jet қалай`,
            `ставка X Jet стратегия`,
            `ақша шығару X Jet`,
            `онлайн казино X Jet пікірлер`,
          ];

  const extra =
    cluster === "payments"
      ? locale === "ru"
        ? [`платежи X Jet visa mastercard`, `крипто вывод USDT bitcoin`]
        : locale === "en"
          ? [`X Jet payments visa mastercard`, `crypto withdrawal USDT bitcoin`]
          : [`X Jet төлемдер visa`, `USDT bitcoin шығару`]
      : cluster === "blog"
        ? locale === "ru"
          ? [`X Jet блог RTP волатильность`, `Aviator сравнение crash`]
          : locale === "en"
            ? [`X Jet blog RTP volatility`, `Aviator comparison crash`]
            : [`X Jet блог RTP`, `Aviator салыстыру`]
        : [`X Jet ${slugPath} FAQ`, `X Jet ${slugPath} лимиты`];

  return takeUnique(rng, [...base, ...extra], 8);
}
