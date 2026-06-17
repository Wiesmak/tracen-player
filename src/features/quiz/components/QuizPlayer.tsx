import { Button, DialogChoice, HorseshoesBackground } from "@wiesmak/umaui-react"
import Image from "next/image"
import type Quiz from "@/entities/quiz"
import AnswerSelector from "@/features/quiz/components/AnswerSelector"
import QuestionBlock from "@/features/quiz/components/QuestionBlock"
import useAnswers from "@/features/quiz/hooks/use-answers"
import useQuestions from "@/features/quiz/hooks/use-questions"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import useSelection from "@/features/quiz/hooks/use-selection"
import { useGetQuestionByIdQuery } from "@/services/quiz-api"

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

    return <HorseshoesBackground config={{
            count: 35,
            min: 20,
            max: 70,
            opacity: 0.6,
        }} >
        <h1 className="text-4xl font-bold">{quiz.title}</h1>
        <QuestionBlock questionId={currentQuestionId}/>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 place-content-center">
            {
                answers.map(a => {
                    const isCorrect = isRevealed && currentQuestion?.answerId === a.id
                    const isWrong = isRevealed && selection === a.id && currentQuestion?.answerId !== a.id

                    return (
                        <DialogChoice
                            key={a.id}
                            label={a.text || ""}
                            // isSelected={selection === a.id}
                            // isCorrect={isCorrect}
                            // isWrong={isWrong}
                            image={
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${a.image}`}
                                    alt={`${a.text}`}
                                />
                            }
                            onClick={() => handleSelect(a.id)}
                            color={isCorrect ? "green" : isWrong ? "pink" : "yellow"}
                        />
                    )
                })
            }
        </div>
        {showKeyboard && (
            <AnswerSelector/>
        )}
        <div className="flex flex-row items-center justify-center gap-4">
            <Button onClick={handleQuit}>End</Button>
            {canEnlarge && selection === null
                ? <Button onClick={handleNext} >Enlarge</Button>
                : <Button onClick={handleNext} disabled={selection === null} primary>Next</Button>
            }
        </div>
    </HorseshoesBackground>
}

export default QuizPlayer