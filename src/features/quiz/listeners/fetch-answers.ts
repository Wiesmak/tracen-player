import type { ListenerEffectAPI } from "@reduxjs/toolkit"
import _ from "lodash"
import type Answer from "@/entities/answer"
import { progressQuiz, type QuizMode, setCanEnlarge, setCurrentAnswers, startQuiz } from "@/features/quiz/slice"
import quizApi from "@/services/quiz-api"
import { startAppListening } from "@/store/listeners"
import type { AppDispatch, RootState } from "@/store/store"

const buildAnswerArray = (answers: Answer[], validAnswerId: string) => {
    const [valid, invalid] = _.partition(answers, { id: validAnswerId });

    return _.shuffle([
        ...valid,
        ..._.sampleSize(invalid, 3)
    ]).map(a => a.id);
}

const setAnswersForQuestion = async (
    api: ListenerEffectAPI<RootState, AppDispatch>,
    quizId: string,
    questionId: string,
    quizMode: QuizMode
) => {
    const questionQuery = api.dispatch(
        quizApi.endpoints.getQuestionById.initiate(questionId)
    )

    const question = await questionQuery.unwrap()
    questionQuery.unsubscribe()

    if (!question) return

    const answersQuery = api.dispatch(quizApi.endpoints.getAnswers.initiate(quizId))

    const answers = await answersQuery.unwrap()
    answersQuery.unsubscribe()

    const validAnswerId = question.answerId
    const validAnswer = answers.find(a => a.id === validAnswerId)
    if (!validAnswer) return

    if (quizMode === "EASY")
        api.dispatch(setCurrentAnswers(buildAnswerArray(answers, validAnswerId)))
    else
        api.dispatch(setCurrentAnswers(answers.map(a => a.id)))
}

const setStateCanEnlarge = async (
    api: ListenerEffectAPI<RootState, AppDispatch>,
    questionId: string,
    subProgress: number,
) => {
    const questionQuery = api.dispatch(
        quizApi.endpoints.getQuestionById.initiate(questionId)
    )

    const question = await questionQuery.unwrap()
    questionQuery.unsubscribe()

    if (!question.images) return

    const imagesCount = question.images.length
    const canEnlarge = imagesCount > 1 && subProgress < imagesCount - 2

    api.dispatch(setCanEnlarge(canEnlarge))
}

const addFetchAnswersListener = () => {
    startAppListening({
        actionCreator: startQuiz,
        effect: async (action, api) => {
            const { quizId, quizMode } = action.payload
            const state = api.getState()
            const questionId = state.quizState.currentQuestions[0]
            if (!questionId) return

            await Promise.all([
                setStateCanEnlarge(api, questionId, state.quizState.subProgress),
                setAnswersForQuestion(api, quizId, questionId, quizMode),
            ])
        }
    })

    startAppListening({
        actionCreator: progressQuiz,
        effect: async (action, api) => {
            const progress = action.payload
            const state = api.getState()
            const quizId = state.quizState.quiz
            if (!progress.progress && !progress.subProgress) return
            const questionId = state.quizState.currentQuestions[progress.progress ?? state.quizState.progress]
            if (!questionId) return
            const quizMode = state.quizState.mode
            const subProgress = progress.subProgress ?? state.quizState.subProgress

            await Promise.all([
                setStateCanEnlarge(api, questionId, subProgress),
                progress.progress && setAnswersForQuestion(api, quizId, questionId, quizMode),
            ])
        }
    })
}

export default addFetchAnswersListener