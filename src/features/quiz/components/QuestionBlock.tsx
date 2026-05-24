"use client"

import Image from "next/image"
import useQuestionBlock from "@/features/quiz/hooks/use-question-block"

interface QuestionBlockProps {
    questionId: string
}

const QuestionBlock = ({questionId}: QuestionBlockProps) => {
    const { question, currentImage, isLoading, error } = useQuestionBlock(questionId)

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            Loading question...
        </div>
    }

    if (error || !question) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            Error!
        </div>
    }

    return <div className="flex flex-col items-center justify-center gap-5 p-5">
        {question.text}
        {currentImage && (
            <Image src={`/assets/${currentImage}`} alt="Question image" width={300} height={200} className="rounded-lg shadow-md"/>
        )}
    </div>
}

export default QuestionBlock