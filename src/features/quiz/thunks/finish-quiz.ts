import { redirect } from "next/navigation"
import QuizConfig from "@/config/quiz-config"
import type { Locale } from "@/i18n/config"
import quizApi from "@/services/quiz-api"
import type { AppThunk } from "@/store/store"

const finishQuiz =
  (locale: Locale): AppThunk =>
  (_dispatch, getState) => {
    const state = getState()

    const { quiz: quizId, score, mode } = state.quizState

    const quizCache = quizApi.endpoints.getQuizById.select(quizId)(state)
    const quizMaxScore = state.quizState.currentQuestions.length
    if (!quizCache.data || !quizMaxScore || quizMaxScore <= 0) {
      redirect(`/${locale}/quiz/list`)
    } else {
      const scorePercent = Math.round((score / quizMaxScore) * 100)
      const passed = scorePercent >= QuizConfig.PassingScore

      redirect(
        `/${locale}/quiz/results?quizId=${encodeURIComponent(quizId)}&mode=${mode}&score=${scorePercent}&passed=${passed}`,
      )
    }
  }

export default finishQuiz
