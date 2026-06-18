"use client"

import { Button, Heading, Modal, Radio } from "@wiesmak/umaui-react"
import Link from "next/link"
import type Quiz from "@/entities/quiz"
import useRandomQuizButton from "@/features/quiz/hooks/use-random-quiz-button"
import styles from "./quiz-item.module.css"

interface RandomQuizButtonProps {
    quizzes: Quiz[]
}

const RandomQuizButton = ({ quizzes }: RandomQuizButtonProps) => {
    const {
        quizId,
        isOpen,
        openRandom,
        closeModal,
        startQuiz,
        selectEasyMode,
        selectHardMode,
        isEasyMode,
        isHardMode,
    } = useRandomQuizButton(quizzes.map(q => q.id))
    const quiz = quizzes.find(q => q.id === quizId) || quizzes[0]

    return <>
        <button onClick={openRandom} type="button"
                className={`${styles.umabox} size-full block col-span-3`}>
            <div className="size-full">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${quiz.image}`}
                     alt="icon" draggable={false} height={256} width={512}
                     className="rounded-2xl lg:rounded-4xl rounded-b-none lg:rounded-b-none pointer-events-none"/>
                <span className="font-semibold text-md text-center lg:text-4xl lg:p-1 block">Losuj quiz</span>
            </div>
        </button>
        <Modal title={quiz.title}
               footer={<div className="flex flex-row items-center justify-center w-full gap-4">
                   <Button onClick={closeModal}>Close</Button>
                   <Link href={`/quiz/${quiz.id}`} transitionTypes={['fade-white']}>
                       <Button onClick={startQuiz} primary>Start</Button>
                   </Link>
               </div>}
               className="!p-2"
               open={isOpen}
               closeOnClickOutside>
            <div className="bg-[#f1f1f1] rounded-lg p-4">
                <Heading className="text-white font-semibold">Opis Quizu</Heading>
                <p className="max-w-3/4 text-[#7a4924] font-semibold p-2 pb-8" style={{color: "#7a4924"}}>
                    {quiz.description}
                </p>
                <Heading className="text-white font-semibold">Zasady gry</Heading>
                <p className="max-w-3/4 text-[#7a4924] font-semibold p-2 pb-8" style={{color: "#7a4924"}}>
                    Tyrtum pyrtum zasady
                </p>
                <Heading className="text-white font-semibold">Tryb gry</Heading>
                <div className={`grid grid-cols-2 items-center justify-center justify-items-center gap-2 mt-4 ${styles['diff-selector-grid']}`}>
                    <span onClick={() => selectEasyMode()}>
                        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/cm_easy.png`} alt={quiz.title} />
                    </span>
                    <Radio caption="OPEN" value="EASY" checked={isEasyMode()} onChange={() => selectEasyMode()}/>
                    <span onClick={() =>selectHardMode()}>
                        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/cm_hard.png`} alt={quiz.title} />
                    </span>
                    <Radio caption="GRADED" value="HARD" checked={isHardMode()} onChange={() => selectHardMode()}/>
                </div>
            </div>
        </Modal>
    </>
}

export default RandomQuizButton