import { redirect } from "next/navigation"
import QuizConfig from "@/config/quiz-config"
import quizApi from "@/services/quiz-api"
import type { AppThunk } from "@/store/store"

const finishQuiz = () : AppThunk => (
    dispatch,
    getState,
) => {
    const state = getState()

    const { quiz: quizId, score, mode } = state.quizState

    const quizCache = quizApi.endpoints.getQuizById.select(quizId)(state)
    const quizName = quizCache.data?.title
    const quizMaxScore = state.quizState.currentQuestions.length
    if (!quizName || !quizMaxScore  || quizMaxScore <= 0) {
        redirect("/error")
    } else {
        const scorePercent = Math.round(score / quizMaxScore * 100)
        const passed = scorePercent >= QuizConfig.PassingScore

        redirect(`/quiz/results?quizName=${encodeURIComponent(quizName)}&mode=${mode}&score=${scorePercent}&passed=${passed}`)
    }
}

export default finishQuiz