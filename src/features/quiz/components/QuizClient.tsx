"use client"

import { ViewTransition } from "react"
import QuizInfoModal from "@/features/quiz/components/QuizInfoModal"
import QuizPlayer from "@/features/quiz/components/QuizPlayer"
import useQuizClient from "@/features/quiz/hooks/use-quiz-client"

interface QuizClientProps {
    id: string
}

const QuizClient = ({id}: QuizClientProps) => {
    const { quiz, isLoading, error, isCurrentQuiz } = useQuizClient(id)

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            Loading quiz...
        </div>
    }

    if (error || !quiz) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/fail.webp`} alt="failed" width={640} height={622} />
        </div>
    }

    return (
        <div
            className="flex flex-col items-center justify-center gap-5 p-5 border rounded-lg shadow-md w-full max-w-xl">
            <QuizInfoModal isOpen={!isCurrentQuiz} quizId={quiz.id} {...quiz} />
            <QuizPlayer quiz={quiz}/>
        </div>
    )
}

export default QuizClient