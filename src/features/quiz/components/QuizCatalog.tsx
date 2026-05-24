"use client"

import type Quiz from "@/entities/quiz"
import QuizItem from "@/features/quiz/components/QuizItem"
import { useGetQuizzesQuery } from "@/services/quiz-api"

const QuizCatalog = () => {
    const {data, error, isLoading} = useGetQuizzesQuery()

    return error ? (
        <div className="flex flex-col items-center justify-center gap-5 p-5">
            error!
        </div>
    ) : isLoading ? (
        <div className="flex flex-col items-center justify-center gap-5 p-5">
            loading...
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-5 p-5">
            {data?.map((quiz: Quiz) => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}

export default QuizCatalog