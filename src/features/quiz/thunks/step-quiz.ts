import QuizConfig from "@/config/quiz-config"
import { progressQuiz, setCurrentSelection } from "@/features/quiz/slice"
import finishQuiz from "@/features/quiz/thunks/finish-quiz"
import quizApi from "@/services/quiz-api"
import type { AppThunk } from "@/store/store"

const stepQuiz = () : AppThunk => (
    dispatch,
    getState
) => {
    const state = getState()
    const {progress, subProgress, score, currentQuestions, currentSelection, isRevealed, quiz: quizId} = state.quizState

    const quizCache = quizApi.endpoints.getQuizById.select(quizId)(state)
    const quiz = quizCache.data
    if (!quiz) return

    const questionCache = quizApi.endpoints.getQuestionById.select(currentQuestions[progress])(state)
    const question = questionCache.data
    if (!question) return

    if (currentSelection === null && subProgress < question.images.length - 2) {
        dispatch(progressQuiz({
            subProgress: subProgress + 1,
        }))
    } else {
        const newScore = QuizConfig.ScoringAlgorithm({
            previousScore: score,
            isCorrect: currentSelection === question.answerId,
            subProgress: subProgress,
            maxHints: question.images.length > 1 ? question.images.length - 2 : 0,
        })

        if (!isRevealed) {
            dispatch(progressQuiz({isRevealed: true}))
        } else {
            if (progress >= currentQuestions.length - 1) {
                dispatch(progressQuiz({
                    score: newScore,
                }))
                dispatch(finishQuiz())
            } else {
                dispatch(setCurrentSelection(null))
                dispatch(progressQuiz({
                    progress: progress + 1,
                    subProgress: 0,
                    score: newScore,
                    isRevealed: false,
                }))
            }
        }
    }
}

export default stepQuiz