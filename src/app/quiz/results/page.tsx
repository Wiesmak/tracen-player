"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

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

    return <div className="flex flex-col items-center justify-center gap-5 p-5">
        <h1 className="text-2xl font-bold">{quizName} ({quizMode}) - Result</h1>
        <p className="text-lg">Your score: {quizScore}%</p>
        <p className={`text-lg text-center ${passed ? "text-green-500" : "text-red-500"}`}>
            {passed ? "Congratulations! You qualified for the reward." : "Unfortunately, your score did not meet the threshold for the reward. Try again!"}
        </p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Back to Home
        </Link>
    </div>
}