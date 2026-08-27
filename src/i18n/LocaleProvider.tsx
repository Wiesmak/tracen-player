"use client"

import { createContext, type ReactNode, useContext, useEffect } from "react"
import type { Locale } from "@/i18n/config"
import type { Dictionary } from "@/i18n/dictionary"

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export const LocaleProvider = ({
  children,
  locale,
  dictionary,
}: {
  children: ReactNode
  locale: Locale
  dictionary: Dictionary
}) => {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider")
  }

  return context
}
