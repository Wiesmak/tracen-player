import { selectCurrentSelection } from "@/features/quiz/slice"
import stepQuiz from "@/features/quiz/thunks/step-quiz"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const useSelection = () => {
    const dispatch = useAppDispatch()

    const selection = useAppSelector(selectCurrentSelection)

    const handleSelect = (answerId: string) => {
        dispatch(stepQuiz({type: "answer", answerId}))
    }

    return { selection, handleSelect }
}

export default useSelection