import { selectCurrentSelection, selectIsRevealed, setCurrentSelection } from "@/features/quiz/slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const useSelection = () => {
    const dispatch = useAppDispatch()

    const selection = useAppSelector(selectCurrentSelection)
    const isRevealed = useAppSelector(selectIsRevealed)

    const handleSelect = (answerId: string) => {
        if (isRevealed) return

        selection !== answerId
            ? dispatch(setCurrentSelection(answerId))
            : dispatch(setCurrentSelection(null))
    }

    return { selection, handleSelect }
}

export default useSelection