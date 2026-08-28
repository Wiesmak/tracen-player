export const locales = ["pl", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "pl"

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale)

export const localizePath = (pathname: string, locale: Locale) => {
  const segments = pathname.split("/")

  if (isLocale(segments[1] ?? "")) {
    segments[1] = locale
  } else {
    segments.splice(1, 0, locale)
  }

  return segments.join("/") || `/${locale}`
}
