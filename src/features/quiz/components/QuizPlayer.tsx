import Image from "next/image"
import type Quiz from "@/entities/quiz"
import AnswerSelector from "@/features/quiz/components/AnswerSelector"
import QuestionBlock from "@/features/quiz/components/QuestionBlock"
import useAnswers from "@/features/quiz/hooks/use-answers"
import useQuestions from "@/features/quiz/hooks/use-questions"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import useSelection from "@/features/quiz/hooks/use-selection"
import { useGetQuestionByIdQuery } from "@/services/quiz-api"
import nextConfig from "../../../../next.config"

interface QuizPageProps {
    quiz: Quiz,
}

const QuizPlayer = ({quiz}: QuizPageProps) => {
    const { progress, subProgress, score, showKeyboard, isRevealed, canEnlarge, handleNext, handleQuit, quizId} = useQuizFlow()
    const { currentQuestionId } = useQuestions()
    const { selection, handleSelect } = useSelection()
    const { answers } = useAnswers()

    const {data: currentQuestion} = useGetQuestionByIdQuery(currentQuestionId ?? "", {
        skip: !currentQuestionId,
    })

    return <>
        <h1 className="text-4xl font-bold">{quiz.title}</h1>
        <QuestionBlock questionId={currentQuestionId}/>
        <div
            className={`grid gap-4 place-items-stretch
                ${showKeyboard ? 'max-h-88 overflow-y-auto sm:max-h-88' : ''}
                grid-cols-2 sm:grid-cols-4`}
        >
            {answers.map(a => {
                const isCorrect = isRevealed && currentQuestion?.answerId === a.id
                const isWrong = isRevealed && selection === a.id && currentQuestion?.answerId !== a.id

                return (
                    <button
                        type="button"
                        key={a.id}
                        className={`flex h-full flex-col items-center gap-2 rounded-lg bg-gray-200 p-3
                        transition-colors duration-200 ease-in-out ${isRevealed ? "" : "hover:bg-gray-300"}
                        ${selection === a.id ? 'border-2 border-gray-800 font-bold' : 'border border-transparent'}
                        ${isCorrect ? 'bg-green-200 border-2 border-green-600' : ''}
                        ${isWrong ? 'bg-red-200 border-2 border-red-600' : ''}`}
                        onClick={() => handleSelect(a.id)}
                    >
                        <Image
                            src={`${nextConfig.basePath}/assets/${a.image}`}
                            alt="Answer image"
                            width={100}
                            height={100}
                            className="rounded-lg shadow-md"
                        />
                        <span className="text-center leading-snug line-clamp-2">{a.text}</span>
                        {isCorrect && (
                            <span className="text-xs font-semibold text-green-700">Correct</span>
                        )}
                        {isWrong && (
                            <span className="text-xs font-semibold text-red-700">Wrong</span>
                        )}
                    </button>
                )
            })}
        </div>
        {showKeyboard && (
            <AnswerSelector/>
        )}
        <div className="flex flex-row items-center justify-center gap-4">
            <button type="reset" onClick={handleQuit} className="
                px-6 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors
                duration-200 ease-in-out
            ">End
            </button>
            {canEnlarge && selection === null
                ? <button type="submit" onClick={handleNext} className="
                    px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors
                    duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">More</button>
                : <button type="submit" onClick={handleNext} className="
                     px-6 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600 transition-colors
                     duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed
                 " disabled={selection === null}>Next</button>
            }
        </div>
    </>
}

export default QuizPlayer