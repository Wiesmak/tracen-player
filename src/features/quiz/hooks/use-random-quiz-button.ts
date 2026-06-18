import _ from "lodash"
import { useState } from "react"
import useQuizItem from "@/features/quiz/hooks/use-quiz-item"

const useRandomQuizButton = (quizzes: string[]) => {
    const [quizId, setQuizId] = useState(() => _.sample(quizzes) || quizzes[0])
    const {
        isOpen,
        openModal,
        closeModal,
        startQuiz,
        selectEasyMode,
        selectHardMode,
        isEasyMode,
        isHardMode,
    } = useQuizItem(quizId)

    const openRandom = () => {
        openModal()
        setQuizId(_.sample(quizzes) || quizzes[0])
    }

    return {quizId, isOpen, openRandom, closeModal, startQuiz, selectEasyMode, selectHardMode, isEasyMode, isHardMode}
}

export default useRandomQuizButton