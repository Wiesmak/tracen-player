import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { isLocale, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"
import { LocaleProvider } from "@/i18n/LocaleProvider"

export const dynamicParams = false

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params

  if (!isLocale(locale)) {
    return {}
  }

  return {
    description: getDictionary(locale).metadata.description,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return (
    <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
      <div lang={locale}>{children}</div>
    </LocaleProvider>
  )
}
