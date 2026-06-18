import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import { useModal } from "@wiesmak/umaui-react"
import { useCallback, useState } from "react"
import { QuizMode } from "@/features/quiz/slice"

const useQuizItem = (quizId: string) => {
    const { handleClearState, handleStart } = useQuizFlow()
    const {isOpen, openModal, closeModal} = useModal()
    const [mode, setMode] = useState(QuizMode.EASY)

    const selectEasyMode = () => setMode(QuizMode.EASY)
    const selectHardMode = () => setMode(QuizMode.HARD)
    const isEasyMode = () => mode === QuizMode.EASY
    const isHardMode = () => mode === QuizMode.HARD

    const startQuiz = useCallback(() => {
        closeModal()
        handleClearState()
        handleStart(quizId, mode)
    }, [closeModal, handleClearState, handleStart, quizId, mode])

    return { isOpen, openModal, closeModal, startQuiz, selectEasyMode, selectHardMode, isEasyMode, isHardMode }
}

export default useQuizItem