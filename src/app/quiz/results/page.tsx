"use client"

import { Button, Progress } from "@wiesmak/umaui-react"
import { defaultTo } from "lodash"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import styles from "./results.module.css"

export default function QuizResultPage() {
    return <Suspense fallback={<div className="p-5 flex justify-center text-lg">Loading result...</div>}>
        <QuizResultContent />
    </Suspense>
}

function QuizResultContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const quizName = searchParams.get("quizName")
    const quizMode = searchParams.get("mode")
    const quizScore = searchParams.get("score")
    const passedStr = searchParams.get("passed")

    if (!quizName || !quizMode || !passedStr || !quizScore) {
        router.push("/error")
        return <div className="p-5 flex justify-center text-lg">Invalid quiz result. Redirecting...</div>
    }

    const passed = passedStr === "true"

    return <div className={`h-screen w-screen bg-cover z-0 flex flex-col justify-start items-center ${styles['fade-in']}`}
                style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/bg.png)`}}>
        <div className="h-5/7 w-full flex flex-col items-center justify-center gap-5 p-5">
            <h1 className={styles['results-header']} data-text={quizName}>
                {quizName}
            </h1>
            <ResultRank score={parseInt(quizScore, 10)}/>
            <p className={`text-6xl font-semibold text-center px-4 py-2 lg:px-8 lg:py-4 w-5/8 ${styles['fade-border']}`}>Wynik {quizScore}%</p>
            {/*<Progress min={0} max={100} value={parseInt(quizScore, 10)} />*/}
            {/*<p className={`text-lg text-center ${passed ? "text-green-500" : "text-red-500"}`}>*/}
            {/*    {passed ? "Congratulations! You qualified for the reward." : "Unfortunately, your score did not meet the threshold for the reward. Try again!"}*/}
            {/*</p>*/}
        </div>
        <div className="h-1/7 w-5/8">
            <div className="flex-1 w-full flex flex-row items-center justify-evenly">
                <div className="self-start bg-yellow-300 border-4 shadow-md border-white rounded-full p-2 h-2/3 aspect-square flex justify-center items-center overflow-hidden">
                    <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/tazuna-smol.png`} alt="tazuna" />
                </div>
                <div className={`${styles['speech-bubble']} text-4xl`}>
                    {passed ? "Świetny wynik! Zgłoś się do prowadzącego po nagrodę." : "Słabo. Spróbuj jeszcze raz!"}
                </div>
            </div>
        </div>
        <div className="fixed bottom-10" >
            <Button primary onClick={() => router.push("/quiz/list")}>Wróć</Button>
        </div>
    </div>
}

function ResultRank({score} : {score: number}) {
    const ranks = ["E", "D", "C", "C+", "B", "B+", "A", "A+"]
    const rank = score === 0
        ? "F"
        : score === 100
            ? "SS"
            : ranks[Math.floor((score / 100) * (ranks.length - 1))]
    return <img src={`/assets/ui/ranks/rank_${rank}.png`} alt={rank} className="drop-shadow-2xl w-1/2" />
}