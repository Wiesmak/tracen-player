import QuizConfig from "@/config/quiz-config"
import { progressQuiz, setCurrentSelection } from "@/features/quiz/slice"
import finishQuiz from "@/features/quiz/thunks/finish-quiz"
import type { Locale } from "@/i18n/config"
import quizApi from "@/services/quiz-api"
import type { AppThunk } from "@/store/store"

export type QuizStepTrigger =
  | { type: "next" }
  | { type: "answer"; answerId: string }
  | { type: "timeout" }

const stepQuiz =
  (
    trigger: QuizStepTrigger = { type: "next" },
    locale: Locale = "pl",
  ): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const {
      progress,
      subProgress,
      score,
      currentQuestions,
      currentSelection,
      isRevealed,
      isTimedOut,
      quiz: quizId,
    } = state.quizState

    if ((trigger.type === "answer" || trigger.type === "timeout") && isRevealed)
      return

    const quizCache = quizApi.endpoints.getQuizById.select(quizId)(state)
    const quiz = quizCache.data
    if (!quiz) return

    const questionCache = quizApi.endpoints.getQuestionById.select(
      currentQuestions[progress],
    )(state)
    const question = questionCache.data
    if (!question) return

    const effectiveSelection =
      trigger.type === "answer" ? trigger.answerId : currentSelection
    const timedOutOutcome = isTimedOut || trigger.type === "timeout"

    if (trigger.type === "answer") {
      dispatch(setCurrentSelection(trigger.answerId))
    }

    if (
      trigger.type === "next" &&
      !isRevealed &&
      effectiveSelection === null &&
      subProgress < question.images.length - 2
    ) {
      dispatch(
        progressQuiz({
          subProgress: subProgress + 1,
        }),
      )
    } else {
      const newScore = QuizConfig.ScoringAlgorithm({
        previousScore: score,
        isCorrect: !timedOutOutcome && effectiveSelection === question.answerId,
        subProgress: subProgress,
        maxHints: question.images.length > 1 ? question.images.length - 2 : 0,
      })

      if (!isRevealed) {
        dispatch(
          progressQuiz({
            isRevealed: true,
            isTimedOut: timedOutOutcome,
          }),
        )
      } else {
        if (progress >= currentQuestions.length - 1) {
          dispatch(
            progressQuiz({
              score: newScore,
            }),
          )
          dispatch(finishQuiz(locale))
        } else {
          dispatch(
            progressQuiz({
              progress: progress + 1,
              subProgress: 0,
              score: newScore,
              isRevealed: false,
            }),
          )
        }
      }
    }
  }

export default stepQuiz
