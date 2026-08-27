"use client"

import { Button } from "@wiesmak/umaui-react"
import { usePathname, useRouter } from "next/navigation"
import { localizePath } from "@/i18n/config"
import { useLocale } from "@/i18n/LocaleProvider"

const LanguageSwitcher = () => {
  const { locale, dictionary } = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const targetLocale = locale === "pl" ? "en" : "pl"
  const title =
    targetLocale === "pl"
      ? dictionary.common.switchToPolish
      : dictionary.common.switchToEnglish

  const switchLanguage = () => {
    const query = window.location.search
    const hash = window.location.hash
    const targetPath = localizePath(pathname, targetLocale)
    router.replace(`${targetPath}${query}${hash}`)
  }

  return (
    <div className="fixed bottom-10 right-5 z-50" title={title}>
      <Button small onClick={switchLanguage}>
        {targetLocale.toUpperCase()}
      </Button>
    </div>
  )
}

export default LanguageSwitcher
