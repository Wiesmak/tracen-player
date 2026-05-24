import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import { useGetQuestionByIdQuery } from "@/services/quiz-api"

const useQuestionBlock = (questionId: string) => {
    const { data: question, error, isLoading } = useGetQuestionByIdQuery(questionId)
    const { subProgress, isRevealed } = useQuizFlow()

    const currentImage = question && question.images.length > 0
        ? question.images.length > 1
            ? isRevealed
                ? question.images[question.images.length - 1]
                : question.images[subProgress]
            : question.images[0]
        : null

    return {
        question,
        currentImage,
        isLoading,
        error
    }
}

export default useQuestionBlock