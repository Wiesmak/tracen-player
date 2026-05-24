"use client"

import Link from "next/link"
import { ViewTransition } from "react"
import type Quiz from "@/entities/quiz"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"

interface QuizItemProps {
    quiz: Quiz
}

const QuizItem = ({ quiz }: QuizItemProps) => {
    const { handleClearState } = useQuizFlow()

    return (
        <ViewTransition name={`quiz-${quiz.id}`} share="morph">
            <Link href={`quiz/${quiz.id}`} onClick={handleClearState} className="p-5 border rounded-lg shadow-md w-full max-w-md">
                <span className="font-bold text-lg">{quiz.title}</span>
                <p>{quiz.description}</p>
            </Link>
        </ViewTransition>
    )
}

export default QuizItem