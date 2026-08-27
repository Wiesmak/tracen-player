import { describe, expect, it } from "vitest"
import { englishOrPolish } from "./localization.mjs"

describe("englishOrPolish", () => {
  it("uses a non-empty English translation", () => {
    expect(englishOrPolish("Polski", "English")).toBe("English")
  })

  it.each([
    undefined,
    null,
    "",
    "   ",
    42,
  ])("falls back to Polish for unavailable English value %s", (english) => {
    expect(englishOrPolish("Polski", english)).toBe("Polski")
  })
})
