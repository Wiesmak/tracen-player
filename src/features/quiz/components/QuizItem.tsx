"use client"

import { Button, Modal, Radio } from "@wiesmak/umaui-react"
import type Quiz from "@/entities/quiz"
import styles from "./quiz-item.module.css"
import Link from "next/link"
import useQuizItem from "@/features/quiz/hooks/use-quiz-item"

interface QuizItemProps {
    quiz: Quiz
}

const QuizItem = ({quiz}: QuizItemProps) => {
    const {
        isOpen,
        openModal,
        closeModal,
        startQuiz,
        selectEasyMode,
        selectHardMode,
        isEasyMode,
        isHardMode,
    } = useQuizItem(quiz.id)

    return <>
        <button key={quiz.id} onClick={openModal} type="button"
                className={`${styles.umabox} size-full block`}>
            <div className="size-full">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/${quiz.image}`}
                     alt="icon" draggable={false} height={256} width={512}
                     className="rounded-2xl lg:rounded-4xl rounded-b-none lg:rounded-b-none pointer-events-none"/>
                <span className="font-semibold text-md text-center lg:text-4xl lg:p-1 block">{quiz.title}</span>
            </div>
        </button>
        <Modal title={quiz.title}
               footer={<div className="flex flex-row items-center justify-center w-full gap-4">
                   <Button onClick={closeModal}>Close</Button>
                   <Link href={`/quiz/${quiz.id}`} transitionTypes={['fade-white']}>
                       <Button onClick={startQuiz} primary>Start</Button>
                   </Link>
               </div>}
               open={isOpen}
               closeOnClickOutside>
            <p className="max-w-2xl">
                {quiz.description}
            </p>
            <div className="flex flex-row items-center justify-center gap-2 mt-4">
                <Radio caption="EASY" value="EASY" checked={isEasyMode()} onChange={selectEasyMode}/>
                <Radio caption="HARD" value="HARD" checked={isHardMode()} onChange={selectHardMode}/>
            </div>
        </Modal>
    </>
}

export default QuizItem