import type Answer from "@/entities/answer"
import {
  selectCurrentAnswers,
  selectCurrentSelectorInput,
  setCurrentSelectorInput,
} from "@/features/quiz/slice"
import { useLocale } from "@/i18n/LocaleProvider"
import { localizeAnswerText } from "@/i18n/localize"
import { useGetAnswersQuery } from "@/services/quiz-api"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const useAnswers = () => {
  const dispatch = useAppDispatch()
  const { locale } = useLocale()

  const currentAnswers = useAppSelector(selectCurrentAnswers)
  const selectorInput = useAppSelector(selectCurrentSelectorInput) ?? ""

  const { answers: rawAnswers } = useGetAnswersQuery("", {
    selectFromResult: ({ data }) => ({
      answers: currentAnswers
        .map((id) => data?.find((answer) => answer.id === id))
        .filter((answer): answer is Answer => Boolean(answer)),
    }),
  })

  const answers = rawAnswers.filter((answer) =>
    localizeAnswerText(answer, locale)
      .toLowerCase()
      .includes(selectorInput.toLowerCase()),
  )

  const handleSelectorInputChange = (value: string) =>
    dispatch(setCurrentSelectorInput(value))

  return { currentAnswers, selectorInput, answers, handleSelectorInputChange }
}

export default useAnswers
