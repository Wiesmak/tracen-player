import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import { useGetQuizByIdQuery } from "@/services/quiz-api"

const useQuizClient = (id: string) => {
    const { data: quiz, error, isLoading } = useGetQuizByIdQuery(id)
    const { quizId: currentQuizId } = useQuizFlow()

    const isCurrentQuiz = currentQuizId === id

    return {
        quiz,
        isLoading,
        error,
        isCurrentQuiz
    }
}

export default useQuizClient