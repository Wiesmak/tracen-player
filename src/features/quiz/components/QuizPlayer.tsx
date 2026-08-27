import {
  Button,
  DialogChoice,
  Heading,
  HorseshoesBackground,
} from "@wiesmak/umaui-react"
import { useCallback } from "react"
import QuizConfig from "@/config/quiz-config"
import type Quiz from "@/entities/quiz"
import AnswerSelector from "@/features/quiz/components/AnswerSelector"
import QuestionBlock from "@/features/quiz/components/QuestionBlock"
import useAnswers from "@/features/quiz/hooks/use-answers"
import useQuestionTimer from "@/features/quiz/hooks/use-question-timer"
import useQuestions from "@/features/quiz/hooks/use-questions"
import useQuizFlow from "@/features/quiz/hooks/use-quiz-flow"
import useSelection from "@/features/quiz/hooks/use-selection"
import LanguageSwitcher from "@/i18n/LanguageSwitcher"
import { useLocale } from "@/i18n/LocaleProvider"
import { localizeAnswerText, localizeQuizTitle } from "@/i18n/localize"
import { useGetQuestionByIdQuery } from "@/services/quiz-api"
import styles from "./quiz-player.module.css"

interface QuizPageProps {
  quiz: Quiz
}

const QuizPlayer = ({ quiz }: QuizPageProps) => {
  const { locale, dictionary } = useLocale()
  const {
    progress,
    showKeyboard,
    isRevealed,
    isTimedOut,
    canEnlarge,
    handleNext,
    handleTimeout,
    handleQuit,
  } = useQuizFlow()
  const { currentQuestionId } = useQuestions()
  const { selection, handleSelect } = useSelection()
  const { answers, currentAnswers } = useAnswers()
  const colors = ["green", "pink", "yellow"]

  const { data: currentQuestion } = useGetQuestionByIdQuery(
    currentQuestionId ?? "",
    {
      skip: !currentQuestionId,
    },
  )

  const isCorrect = useCallback(
    () => selection === currentQuestion?.answerId,
    [selection, currentQuestion?.answerId],
  )

  const isAnswerReady = Boolean(currentQuestion) && currentAnswers.length > 0
  const remainingSeconds = useQuestionTimer({
    questionId: currentQuestionId,
    isReady: isAnswerReady,
    isRevealed,
    durationSeconds: QuizConfig.QuestionTimeLimitSeconds,
    onTimeout: handleTimeout,
  })

  return (
    <HorseshoesBackground
      config={{
        count: 35,
        min: 20,
        max: 70,
        opacity: 0.6,
      }}
    >
      <Heading
        width="16rem"
        backgroundColor="slategray"
        className="font-semibold text-white top-2 left-0 fixed"
      >
        {localizeQuizTitle(quiz, locale)}
      </Heading>
      {!isRevealed && isAnswerReady && (
        <div className={styles.timer} role="timer">
          {dictionary.player.time}: {remainingSeconds}{" "}
          {dictionary.player.secondsAbbreviation}
        </div>
      )}
      <div className="flex-2 w-3/4 max-h-1/3">
        <QuestionBlock
          questionId={currentQuestionId}
          quizTitle={`${dictionary.player.question} ${progress + 1}`}
          isRevealed={isRevealed}
          isCorrect={isCorrect()}
          isTimedOut={isTimedOut}
        />
      </div>
      <div className={`flex-3 overflow-y-auto`}>
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 place-content-center">
          {isRevealed
            ? answers
                .filter(
                  (a) =>
                    a.id === selection || a.id === currentQuestion?.answerId,
                )
                .map((a) => (
                  <DialogChoice
                    key={a.id}
                    label={localizeAnswerText(a, locale)}
                    // isSelected={selection === a.id}
                    // isCorrect={isCorrect}
                    // isWrong={isWrong}
                    image={
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${a.image}`}
                        alt={localizeAnswerText(a, locale)}
                      />
                    }
                    onClick={() => handleNext()}
                    color={
                      a.id === currentQuestion?.answerId ? "green" : "pink"
                    }
                  />
                ))
            : answers.map((a, i) => (
                <DialogChoice
                  key={a.id}
                  label={localizeAnswerText(a, locale)}
                  // isSelected={selection === a.id}
                  // isCorrect={isCorrect}
                  // isWrong={isWrong}
                  image={
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${a.image}`}
                      alt={localizeAnswerText(a, locale)}
                    />
                  }
                  onClick={() => handleSelect(a.id)}
                  color={
                    colors[i % colors.length] as "green" | "pink" | "yellow"
                  }
                />
              ))}
        </div>
      </div>
      {showKeyboard && !isRevealed && <AnswerSelector />}
      {(isRevealed || canEnlarge) && (
        <div className="flex flex-row items-center justify-center gap-4">
          {canEnlarge && (
            <Button onClick={handleNext}>{dictionary.player.enlarge}</Button>
          )}
          {isRevealed && (
            <Button
              onClick={handleNext}
              disabled={selection === null && !isTimedOut}
              primary
            >
              {dictionary.player.next}
            </Button>
          )}
        </div>
      )}
      <div className="fixed bottom-10 left-5">
        <Button small onClick={handleQuit}>
          {dictionary.common.exit}
        </Button>
      </div>
      <LanguageSwitcher />
    </HorseshoesBackground>
  )
}

export default QuizPlayer
