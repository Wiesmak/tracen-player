import type { Locale } from "@/i18n/config"
import english from "@/i18n/dictionaries/en"
import polish from "@/i18n/dictionaries/pl"

export const getDictionary = (locale: Locale) =>
  locale === "en" ? english : polish
