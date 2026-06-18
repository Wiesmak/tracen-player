import fs from "node:fs/promises"
import path from "node:path"
import { use } from "react"
import type Quiz from "@/entities/quiz"
import QuizClient from "@/features/quiz/components/QuizClient"
import styles from './quiz.module.css'

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return <div className={`flex flex-col items-center justify-center gap-5 p-5 ${styles['fade-in']} h-screen w-screen`}>
        <QuizClient id={id} />
    </div>
}

export async function generateStaticParams() {
    const quizzesPath = path.join(process.cwd(), "public", "data", "quizzes.json")
    const jsonData = await fs.readFile(quizzesPath, "utf-8")
    const quizzes: Quiz[] = JSON.parse(jsonData)
    return quizzes.map(quiz => ({ id: quiz.id }))
}
