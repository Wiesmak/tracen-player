import { useState } from "react"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import { QuizMode } from "@/features/quiz/slice"
import { useModal } from "@/hooks/use-modal"

interface QuizInfoModalProps {
    isOpen: boolean,
    quizId: string,
    title: string,
    description: string,
}

const QuizInfoModal = ({isOpen, quizId, title, description}: QuizInfoModalProps) => {
    const { handleStart } = useQuizFlow()
    const dialogRef = useModal(isOpen)
    const [mode, setMode] = useState(QuizMode.EASY)

    return <dialog ref={dialogRef} className="rounded-xl shadow-lg backdrop:bg-black/50 p-0 m-auto max-w-lg w-full">
        <div className="flex flex-col items-center justify-center gap-5 p-8 bg-white">
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <p className="text-center">{description}</p>
            <p>Select mode:</p>
            <div className="flex flex-row items-center justify-center gap-4">
                <button type="button" onClick={() => setMode(QuizMode.EASY)} disabled={mode === "EASY"} className={
                    mode === "EASY" ? "px-4 py-2 bg-blue-200 border-blue-500 border-2 text-blue-500 rounded font-bold" : "px-4 py-2 bg-gray-200 rounded transition-colors duration-200 ease-in-out hover:bg-gray-300"
                }>EASY</button>
                <button type="button" onClick={() => setMode(QuizMode.HARD)} disabled={mode === "HARD"} className={
                    mode === "HARD" ? "px-4 py-2 bg-blue-200 border-blue-500 border-2 text-blue-500 rounded font-bold" : "px-4 py-2 bg-gray-200 rounded transition-colors duration-200 ease-in-out hover:bg-gray-300"
                }>HARD</button>
            </div>
            <button type="submit" onClick={() => handleStart(quizId, mode)}
                    className="px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors">
                Start Quiz
            </button>
        </div>
    </dialog>
}

export default QuizInfoModal