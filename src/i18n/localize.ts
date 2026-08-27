import type Answer from "@/entities/answer"
import type Question from "@/entities/question"
import type Quiz from "@/entities/quiz"
import type { Locale } from "@/i18n/config"

const englishOrPolish = (polish: string | null, english: string | null) =>
  english?.trim() || polish || ""

export const localizeQuizTitle = (quiz: Quiz, locale: Locale) =>
  locale === "en" ? englishOrPolish(quiz.title, quiz.title_en) : quiz.title

export const localizeQuizDescription = (quiz: Quiz, locale: Locale) =>
  locale === "en"
    ? englishOrPolish(quiz.description, quiz.description_en)
    : quiz.description

export const localizeQuestionText = (question: Question, locale: Locale) =>
  locale === "en"
    ? englishOrPolish(question.text, question.text_en)
    : question.text || ""

export const localizeAnswerText = (answer: Answer, locale: Locale) =>
  locale === "en"
    ? englishOrPolish(answer.text, answer.text_en)
    : answer.text || ""
