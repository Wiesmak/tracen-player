import { useEffect, useRef, useState } from "react"

interface QuestionTimerOptions {
    questionId: string | undefined,
    isReady: boolean,
    isRevealed: boolean,
    durationSeconds: number,
    onTimeout: () => void,
}

const useQuestionTimer = ({
    questionId,
    isReady,
    isRevealed,
    durationSeconds,
    onTimeout,
}: QuestionTimerOptions) => {
    const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
    const onTimeoutRef = useRef(onTimeout)

    useEffect(() => {
        onTimeoutRef.current = onTimeout
    }, [onTimeout])

    useEffect(() => {
        setRemainingSeconds(durationSeconds)

        if (!questionId || !isReady || isRevealed) return

        const deadline = Date.now() + durationSeconds * 1000
        let hasExpired = false

        const updateRemainingTime = () => {
            const nextRemainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
            setRemainingSeconds(nextRemainingSeconds)

            if (nextRemainingSeconds === 0 && !hasExpired) {
                hasExpired = true
                onTimeoutRef.current()
            }
        }

        updateRemainingTime()
        const intervalId = window.setInterval(updateRemainingTime, 250)

        return () => window.clearInterval(intervalId)
    }, [durationSeconds, isReady, isRevealed, questionId])

    return remainingSeconds
}

export default useQuestionTimer
