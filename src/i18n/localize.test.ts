import { describe, expect, it } from "vitest"
import type Answer from "@/entities/answer"
import type Quiz from "@/entities/quiz"
import {
  localizeAnswerText,
  localizeQuizDescription,
  localizeQuizTitle,
} from "@/i18n/localize"

const quiz = {
  title: "Polski tytuł",
  title_en: "English title",
  description: "Polski opis",
  description_en: "English description",
} as Quiz

describe("localized quiz data", () => {
  it("selects fields for the requested locale", () => {
    expect(localizeQuizTitle(quiz, "pl")).toBe("Polski tytuł")
    expect(localizeQuizTitle(quiz, "en")).toBe("English title")
    expect(localizeQuizDescription(quiz, "en")).toBe("English description")
  })

  it("safely falls back to Polish text", () => {
    const answer = { text: "Polska odpowiedź", text_en: "" } as Answer
    expect(localizeAnswerText(answer, "en")).toBe("Polska odpowiedź")
  })
})
