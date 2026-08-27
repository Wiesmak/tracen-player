import { useRouter } from "next/navigation"
import {
    endQuiz,
    prepareQuiz, type QuizMode, selectCanEnlarge,
    selectCurrentQuizId,
    selectIsQuizActive, selectIsRevealed, selectIsTimedOut,
    selectProgress, selectQuizMode,
    selectScore, selectSubProgress,
} from "@/features/quiz/slice"
import beginQuiz from "@/features/quiz/thunks/begin-quiz"
import stepQuiz from "@/features/quiz/thunks/step-quiz"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const useQuizFlow = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const progress = useAppSelector(selectProgress)
    const subProgress = useAppSelector(selectSubProgress)
    const score = useAppSelector(selectScore)
    const isQuizActive = useAppSelector(selectIsQuizActive)
    const quizId = useAppSelector(selectCurrentQuizId)
    const showKeyboard = useAppSelector(selectQuizMode) === "HARD"
    const isRevealed = useAppSelector(selectIsRevealed)
    const isTimedOut = useAppSelector(selectIsTimedOut)
    const canEnlarge = useAppSelector(selectCanEnlarge)

    const handleStart = (id: string, mode: QuizMode) => {
        dispatch(prepareQuiz({
            quizId: id,
            quizMode: mode,
        }))
        dispatch(beginQuiz())
    }

    const handleNext = () => {
        dispatch(stepQuiz({type: "next"}))
    }

    const handleTimeout = () => {
        dispatch(stepQuiz({type: "timeout"}))
    }

    const handleQuit = () => {
        // dispatch(endQuiz())
        router.push("/quiz/list", {transitionTypes: ['fade-white']})
    }

    const handleClearState = () => {
        dispatch(endQuiz())
    }

    return {
        progress,
        subProgress,
        score,
        isQuizActive,
        quizId,
        showKeyboard,
        isRevealed,
        isTimedOut,
        canEnlarge,
        handleStart,
        handleNext,
        handleTimeout,
        handleQuit,
        handleClearState,
    }
}

export default useQuizFlow