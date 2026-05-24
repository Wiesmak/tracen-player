import _ from "lodash"
import QuizConfig from "@/config/quiz-config"
import { startQuiz } from "@/features/quiz/slice"
import quizApi from "@/services/quiz-api"
import type { AppThunk } from "@/store/store"

const beginQuiz = () : AppThunk => (
    dispatch,
    getState
) => {
    const state = getState()
    const { quiz: quizId, mode } = state.quizState

    const quizCache = quizApi.endpoints.getQuizById.select(quizId)(state)
    const quiz = quizCache.data
    if (!quiz) return

    const quizLength = QuizConfig.QuizLength

    const questions = _.sampleSize(quiz.questions, quizLength)

    dispatch(startQuiz({
        quizId: quizId,
        quizMode: mode,
        questions: questions,
    }))
}

export default beginQuiz