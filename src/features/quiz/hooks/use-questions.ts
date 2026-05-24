import { selectCurrentQuestions, selectProgress } from "@/features/quiz/slice"
import { useAppSelector } from "@/store/hooks"

const useQuestions = () => {
    const currentQuestions = useAppSelector(selectCurrentQuestions)
    const progress = useAppSelector(selectProgress)

    const currentQuestionId = currentQuestions[progress]

    return { currentQuestionId }
}

export default useQuestions