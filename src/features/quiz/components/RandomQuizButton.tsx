"use client"

import { Button, Heading, Modal, Radio } from "@wiesmak/umaui-react"
import Link from "next/link"
import type Quiz from "@/entities/quiz"
import useRandomQuizButton from "@/features/quiz/hooks/use-random-quiz-button"
import { useLocale } from "@/i18n/LocaleProvider"
import { localizeQuizDescription, localizeQuizTitle } from "@/i18n/localize"
import styles from "./quiz-item.module.css"

interface RandomQuizButtonProps {
  quizzes: Quiz[]
}

const RandomQuizButton = ({ quizzes }: RandomQuizButtonProps) => {
  const { locale, dictionary } = useLocale()
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
  } = useRandomQuizButton(quizzes.map((q) => q.id))
  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0]

  return (
    <>
      <button
        onClick={openRandom}
        type="button"
        className={`${styles.umabox} size-full block col-span-3`}
      >
        <div className="size-full">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/button_go_lg.png`}
            alt={dictionary.catalog.quizIconAlt}
            draggable={false}
            height={136}
            width={972}
            className="rounded-2xl lg:rounded-4xl rounded-b-none lg:rounded-b-none pointer-events-none"
          />
          <span className="font-semibold text-md text-center lg:text-4xl lg:p-1 block">
            {dictionary.catalog.randomQuiz}
          </span>
        </div>
      </button>
      <Modal
        title={localizeQuizTitle(quiz, locale)}
        footer={
          <div className="flex flex-row items-center justify-center w-full gap-4">
            <Button onClick={closeModal}>{dictionary.common.close}</Button>
            <Link
              href={`/${locale}/quiz/${quiz.id}`}
              transitionTypes={["fade-white"]}
            >
              <Button onClick={startQuiz} primary>
                {dictionary.common.start}
              </Button>
            </Link>
          </div>
        }
        className="!p-2"
        open={isOpen}
        closeOnClickOutside
      >
        <div className="bg-[#f1f1f1] rounded-lg p-4">
          <Heading className="text-white font-semibold">
            {dictionary.catalog.descriptionTitle}
          </Heading>
          <p
            className="max-w-3/4 text-[#7a4924] font-semibold p-2 pb-8"
            style={{ color: "#7a4924" }}
          >
            {localizeQuizDescription(quiz, locale)}
          </p>
          <Heading className="text-white font-semibold">
            {dictionary.catalog.rulesTitle}
          </Heading>
          <p
            className="max-w-3/4 text-[#7a4924] font-semibold p-2 pb-8"
            style={{ color: "#7a4924" }}
          >
            {dictionary.catalog.rules.map((rule) => (
              <span key={rule}>
                {rule}
                <br />
              </span>
            ))}
          </p>
          <Heading className="text-white font-semibold">
            {dictionary.catalog.gameModeTitle}
          </Heading>
          <div
            className={`grid grid-cols-2 items-center justify-center justify-items-center gap-2 mt-4 ${styles["diff-selector-grid"]}`}
          >
            <span onClick={() => selectEasyMode()}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/cm_easy.png`}
                alt={dictionary.catalog.easyMode}
              />
            </span>
            <Radio
              caption={dictionary.catalog.easyMode}
              value="EASY"
              checked={isEasyMode()}
              onChange={() => selectEasyMode()}
            />
            <span onClick={() => selectHardMode()}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/cm_hard.png`}
                alt={dictionary.catalog.hardMode}
              />
            </span>
            <Radio
              caption={dictionary.catalog.hardMode}
              value="HARD"
              checked={isHardMode()}
              onChange={() => selectHardMode()}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RandomQuizButton
