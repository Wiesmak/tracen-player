"use client"

import QuizPlayer from "@/features/quiz/components/QuizPlayer"
import useQuizClient from "@/features/quiz/hooks/use-quiz-client"
import { useLocale } from "@/i18n/LocaleProvider"

interface QuizClientProps {
  id: string
}

const QuizClient = ({ id }: QuizClientProps) => {
  const { quiz, isLoading, error } = useQuizClient(id)
  const { dictionary } = useLocale()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-5">
        {dictionary.common.loadingQuiz}
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 p-5">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/fail.webp`}
          alt={dictionary.player.failedAlt}
          width={640}
          height={622}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-5 w-full h-full">
      <QuizPlayer quiz={quiz} />
    </div>
  )
}

export default QuizClient
