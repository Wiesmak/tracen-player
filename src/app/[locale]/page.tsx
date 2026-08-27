import { notFound } from "next/navigation"
import LandingPage from "@/features/landing/LandingPage"
import { isLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <LandingPage locale={locale} dictionary={getDictionary(locale)} />
}
