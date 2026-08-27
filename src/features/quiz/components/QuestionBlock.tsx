"use client"

import useQuestionBlock from "@/features/quiz/hooks/use-question-block"
import styles from "./question-block.module.css"

interface QuestionBlockProps {
    questionId: string,
    quizTitle: string,
    isRevealed: boolean,
    isCorrect: boolean,
    isTimedOut: boolean,
}

const QuestionBlock = ({questionId, quizTitle, isRevealed, isCorrect, isTimedOut}: QuestionBlockProps) => {
    const { question, currentImage, isLoading, error } = useQuestionBlock(questionId)

    if (isLoading) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            Loading question...
        </div>
    }

    if (error || !question) {
        return <div className="flex flex-col items-center justify-center gap-5 p-5">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/fail.jpg`} alt="failed" width={640} height={622} />
        </div>
    }

    return <div className="flex flex-col items-center justify-between gap-12 p-5 h-full">
        <div className="flex-1 w-full flex flex-row items-center justify-evenly">
            <div className="self-start bg-yellow-300 border-4 shadow-md border-white rounded-full p-2 h-2/3
                            aspect-square flex justify-center items-center overflow-hidden">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/tazuna-smol.png`} alt="tazuna" />
            </div>
            <div className={`${styles['speech-bubble']} text-4xl`}>
                <span className={`${styles.title} text-3xl`}>{quizTitle}</span>
                {
                    !isRevealed
                        ? question.text
                        : isTimedOut
                            ? "Czas minął..."
                            : isCorrect
                                ? "Tak jest!"
                                : "Nie, to nie jest poprawna odpowiedź."
                }
            </div>
        </div>
        {currentImage && (
            <div className={"flex-2 flex flex-col items-center justify-center gap-5 p-5 bg-[#fafbfa] " +
                "border border-gray-300 rounded-md max-w-full max-h-full overflow-hidden"}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${currentImage}`} alt={question.text || ""}
                    className="max-w-full max-h-full object-contain"/>
            </div>
        )}
    </div>
}

export default QuestionBlock