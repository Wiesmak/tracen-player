import { useEffect, useRef, useState } from "react"
import {
  ensureQuestionDeadline,
  selectQuestionDeadline,
} from "@/features/quiz/slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

interface QuestionTimerOptions {
  questionId: string | undefined
  isReady: boolean
  isRevealed: boolean
  durationSeconds: number
  onTimeout: () => void
}

const useQuestionTimer = ({
  questionId,
  isReady,
  isRevealed,
  durationSeconds,
  onTimeout,
}: QuestionTimerOptions) => {
  const dispatch = useAppDispatch()
  const deadline = useAppSelector(selectQuestionDeadline)
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
  const onTimeoutRef = useRef(onTimeout)

  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    if (!questionId || !isReady || isRevealed || deadline !== null) return

    dispatch(
      ensureQuestionDeadline({
        questionId,
        deadline: Date.now() + durationSeconds * 1000,
      }),
    )
  }, [deadline, dispatch, durationSeconds, isReady, isRevealed, questionId])

  useEffect(() => {
    if (!questionId || !isReady || isRevealed || deadline === null) {
      setRemainingSeconds(durationSeconds)
      return
    }

    let hasExpired = false

    const updateRemainingTime = () => {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      )
      setRemainingSeconds(nextRemainingSeconds)

      if (nextRemainingSeconds === 0 && !hasExpired) {
        hasExpired = true
        onTimeoutRef.current()
      }
    }

    updateRemainingTime()
    const intervalId = window.setInterval(updateRemainingTime, 250)

    return () => window.clearInterval(intervalId)
  }, [deadline, durationSeconds, isReady, isRevealed, questionId])

  return remainingSeconds
}

export default useQuestionTimer
