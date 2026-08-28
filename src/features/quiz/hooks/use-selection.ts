import { selectCurrentSelection } from "@/features/quiz/slice"
import stepQuiz from "@/features/quiz/thunks/step-quiz"
import { useLocale } from "@/i18n/LocaleProvider"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const useSelection = () => {
  const dispatch = useAppDispatch()
  const { locale } = useLocale()

  const selection = useAppSelector(selectCurrentSelection)

  const handleSelect = (answerId: string) => {
    dispatch(stepQuiz({ type: "answer", answerId }, locale))
  }

  return { selection, handleSelect }
}

export default useSelection
