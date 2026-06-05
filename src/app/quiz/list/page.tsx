import { ViewTransition } from "react"
import QuizCatalog from "@/features/quiz/components/QuizCatalog"

export default function Home() {
    return (
        <ViewTransition
            enter={{'fade-white': 'fade-white-enter', default: 'none'}}
            exit={{'fade-white': 'fade-white-exit', default: 'none'}}
            default="none">
            <QuizCatalog/>
        </ViewTransition>
    )
}