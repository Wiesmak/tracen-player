import { Button, DialogChoice, Heading, HorseshoesBackground } from "@wiesmak/umaui-react"
import { useCallback } from "react"
import type Quiz from "@/entities/quiz"
import AnswerSelector from "@/features/quiz/components/AnswerSelector"
import QuestionBlock from "@/features/quiz/components/QuestionBlock"
import useAnswers from "@/features/quiz/hooks/use-answers"
import useQuestions from "@/features/quiz/hooks/use-questions"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import useSelection from "@/features/quiz/hooks/use-selection"
import { useGetQuestionByIdQuery } from "@/services/quiz-api"
import styles from "./quiz-player.module.css"

interface QuizPageProps {
    quiz: Quiz,
}

const QuizPlayer = ({quiz}: QuizPageProps) => {
    const { progress, subProgress, score, showKeyboard, isRevealed, canEnlarge, handleNext, handleQuit, quizId} = useQuizFlow()
    const { currentQuestionId } = useQuestions()
    const { selection, handleSelect } = useSelection()
    const { answers } = useAnswers()
    const colors = ["green", "pink", "yellow"]

    const {data: currentQuestion} = useGetQuestionByIdQuery(currentQuestionId ?? "", {
        skip: !currentQuestionId,
    })

    const isCorrect = useCallback(() =>
        selection === currentQuestion?.answerId,
    [selection, currentQuestion?.answerId])


    return <HorseshoesBackground config={{
            count: 35,
            min: 20,
            max: 70,
            opacity: 0.6,
        }} >
        <Heading width="16rem" backgroundColor="slategray" className="font-semibold text-white top-2 left-0 fixed">
            {quiz.title}
        </Heading>
        <div className="flex-2 w-3/4 max-h-1/3">
            <QuestionBlock questionId={currentQuestionId} quizTitle={`Pytanie ${progress + 1}`} isRevealed={isRevealed} isCorrect={isCorrect()}/>
        </div>
        <div className={`flex-3 overflow-y-auto`}>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 place-content-center">
                {isRevealed
                    ? answers.filter(a => a.id === selection || a.id === currentQuestion?.answerId).map(a => (
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
                            onClick={() => handleNext()}
                            color={a.id === currentQuestion?.answerId ? "green" : "pink"}
                        />
                    )) : answers.map((a, i) => (
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
                                color={colors[i % colors.length] as "green" | "pink" | "yellow"}
                            />
                        )
                    )
                }
            </div>

        </div>
        {(showKeyboard && !isRevealed) && (
            <AnswerSelector/>
        )}
        { (isRevealed || canEnlarge) && (
            <div className="flex flex-row items-center justify-center gap-4">
                {canEnlarge && <Button onClick={handleNext} >Powiększ</Button>}
                {isRevealed && <Button onClick={handleNext} disabled={selection === null} primary>Dalej</Button>}
            </div>
        )}
        <div className="fixed bottom-5 left-5">
            <Button small onClick={handleQuit}>Wyjdź</Button>
        </div>
    </HorseshoesBackground>
}

export default QuizPlayer