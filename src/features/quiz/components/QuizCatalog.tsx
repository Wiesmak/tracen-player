"use client"

import Image from "next/image"
import type Quiz from "@/entities/quiz"
import QuizItem from "@/features/quiz/components/QuizItem"
import { useGetQuizzesQuery } from "@/services/quiz-api"

const QuizCatalog = () => {
    const {data, error, isLoading} = useGetQuizzesQuery()

    return <div className="h-screen w-screen">
        <div className="relative h-2/5 w-full bg-slate-300">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/tazuna.png`}
                   alt="tazuna" width={512} height={512}
                   className="absolute bottom-0 left-0 h-5/6 w-auto"
            />
        </div>
        <div className="relative z-0 h-3/5 w-full bg-cover bg-center overflow-x-hidden overflow-y-auto"
             style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/bg.png)`}}>
            {
                error ? (
                    <div className="flex flex-col items-center justify-center gap-5 p-5">
                        {/*error!*/}
                    </div>
                ) : isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-5 p-5">
                        {/*loading...*/}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 items-center justify-center
                                    gap-3 lg:gap-7 py-2 lg:py-5 px-5 lg:px-12">
                        {data?.map((quiz: Quiz) => (
                            <QuizItem key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                )
            }
        </div>
    </div>
}

export default QuizCatalog