import type { ContentCluster } from "@/data/pages";
import type { Locale } from "@/lib/constants";

export function pageH1(locale: Locale, cluster: ContentCluster, slugPath: string): string {
  const path = slugPath.replaceAll("/", " · ");
  if (locale === "ru") {
    if (slugPath === "") return "X Jet — краш‑игра: множитель, коэффициент и ответственная ставка";
    if (slugPath === "privacy") return "Политика конфиденциальности X Jet Game";
    if (slugPath === "terms") return "Условия использования X Jet Game";
    return `${path}: гид по X Jet, crash game и онлайн казино`;
  }
  if (locale === "en") {
    if (slugPath === "") return "X Jet crash game — multiplier, coefficient & responsible bets";
    if (slugPath === "privacy") return "Privacy Policy — X Jet Game";
    if (slugPath === "terms") return "Terms of Service — X Jet Game";
    return `${path}: X Jet guide — crash game & online casino context`;
  }
  if (slugPath === "") return "X Jet crash ойыны — multiplier, coefficient және жауапты ставка";
  if (slugPath === "privacy") return "Құпиялылық саясаты — X Jet Game";
  if (slugPath === "terms") return "Қызмет көрсету шарттары — X Jet Game";
  return `${path}: X Jet нұсқауы — crash game және онлайн казино`;
}

export function pageSubtitle(locale: Locale, slugPath: string): string {
  if (locale === "ru")
    return `Материал для темы «${slugPath || "главная"}»: crash game, множитель, коэффициент, ставка, вывод денег и контекст онлайн казино — без обещаний гарантированного выигрыша. 18+`;
  if (locale === "en")
    return `Editorial guide for “${slugPath || "home"}”: crash game mechanics, multiplier, coefficient, bet sizing, withdrawals, licensed online casino notes. 18+ only.`;
  return `«${slugPath || "басты бет"}» тақырыбы: crash game, multiplier, coefficient, ставка, ақша шығару, онлайн казино контексті. 18+.`;
}
