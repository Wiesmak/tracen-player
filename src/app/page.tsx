import LandingPage from "@/features/landing/LandingPage"
import { defaultLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/get-dictionary"

export default function Home() {
  return (
    <LandingPage
      locale={defaultLocale}
      dictionary={getDictionary(defaultLocale)}
    />
  )
}
