"use client"

import { Button } from "@wiesmak/umaui-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useLocale } from "@/i18n/LocaleProvider"
import { localizeQuizTitle } from "@/i18n/localize"
import { useGetQuizByIdQuery } from "@/services/quiz-api"
import styles from "./results.module.css"

export default function QuizResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <QuizResultContent />
    </Suspense>
  )
}

const ResultLoading = () => {
  const { dictionary } = useLocale()
  return (
    <div className="p-5 flex justify-center text-lg">
      {dictionary.common.loadingResult}
    </div>
  )
}

function QuizResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { locale, dictionary } = useLocale()

  const quizId = searchParams.get("quizId")
  const quizMode = searchParams.get("mode")
  const quizScore = searchParams.get("score")
  const passedStr = searchParams.get("passed")
  const hasInvalidParams =
    !quizId || !quizMode || passedStr === null || quizScore === null

  const {
    data: quiz,
    isLoading,
    error,
  } = useGetQuizByIdQuery(quizId ?? "", {
    skip: !quizId,
  })

  useEffect(() => {
    if (hasInvalidParams || (!isLoading && (error || !quiz))) {
      router.replace(`/${locale}/quiz/list`)
    }
  }, [error, hasInvalidParams, isLoading, locale, quiz, router])

  if (hasInvalidParams || (!isLoading && (error || !quiz))) {
    return (
      <div className="p-5 flex justify-center text-lg">
        {dictionary.common.invalidResult}
      </div>
    )
  }

  if (isLoading || !quiz) {
    return <ResultLoading />
  }

  const passed = passedStr === "true"
  const score = Number.parseInt(quizScore, 10)
  const quizName = localizeQuizTitle(quiz, locale)

  return (
    <div
      className={`h-screen w-screen bg-cover z-0 flex flex-col justify-start items-center ${styles["fade-in"]}`}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/bg.png)`,
      }}
    >
      <div className="h-5/7 w-full flex flex-col items-center justify-center gap-5 p-5">
        <h1 className={styles["results-header"]} data-text={quizName}>
          {quizName}
        </h1>
        <ResultRank score={score} />
        <p
          className={`text-6xl font-semibold text-center px-4 py-2 lg:px-8 lg:py-4 w-5/8 ${styles["fade-border"]}`}
        >
          {dictionary.results.score} {quizScore}%
        </p>
      </div>
      <div className="h-1/7 w-5/8">
        <div className="flex-1 w-full flex flex-row items-center justify-evenly">
          <div className="self-start bg-yellow-300 border-4 shadow-md border-white rounded-full p-2 h-2/3 aspect-square flex justify-center items-center overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/tazuna-smol.png`}
              alt={dictionary.results.guideAlt}
            />
          </div>
          <div className={`${styles["speech-bubble"]} text-4xl`}>
            {passed ? dictionary.results.passed : dictionary.results.failed}
          </div>
        </div>
      </div>
      <div className="fixed bottom-12">
        <Button primary onClick={() => router.push(`/${locale}/quiz/list`)}>
          {dictionary.common.back}
        </Button>
      </div>
    </div>
  )
}

function ResultRank({ score }: { score: number }) {
  const ranks = ["E", "D", "C", "C+", "B", "B+", "A", "A+"]
  const rank =
    score === 0
      ? "F"
      : score === 100
        ? "SS"
        : ranks[Math.floor((score / 100) * (ranks.length - 1))]

  return (
    <img
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/ranks/rank_${rank}.png`}
      alt={rank}
      className="drop-shadow-2xl w-1/2"
    />
  )
}
