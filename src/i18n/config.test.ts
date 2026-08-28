import { describe, expect, it } from "vitest"
import { isLocale, localizePath } from "@/i18n/config"

describe("locale configuration", () => {
  it("accepts only supported locales", () => {
    expect(isLocale("pl")).toBe(true)
    expect(isLocale("en")).toBe(true)
    expect(isLocale("de")).toBe(false)
  })

  it("replaces an existing locale without changing the rest of the path", () => {
    expect(localizePath("/pl/quiz/ear_decors", "en")).toBe(
      "/en/quiz/ear_decors",
    )
  })

  it("adds a locale to an unlocalized path", () => {
    expect(localizePath("/quiz/list", "pl")).toBe("/pl/quiz/list")
  })
})
