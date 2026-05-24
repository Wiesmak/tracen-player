import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type Question from "@/entities/question"
import type Quiz from "@/entities/quiz"
import Answer from "@/entities/answer"

const quizApi = createApi({
    reducerPath: "quizApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/data" }),
    endpoints: (builder) => ({
        getQuizzes: builder.query<Quiz[], void>({
            query: () => '/quizzes.json',
            transformResponse: (response: unknown): Quiz[] => {
                return response as Quiz[]
            },
        }),
        getQuizById: builder.query<Quiz, string>({
            query: (_) => '/quizzes.json',
            transformResponse: (response: unknown, _, id): Quiz => {
                const quizzes = response as Quiz[]
                return quizzes.find(q => q.id === id) as Quiz
            },
        }),
        getQuestionById: builder.query<Question, string>({
            query: (_) => '/questions.json',
            transformResponse: (response: unknown, _, id): Question => {
                const questions = response as Question[]
                return questions.find(q => q.id === id) as Question
            },
        }),
        getAnswers: builder.query<Answer[], string>({
            query: (_) => '/answers.json',
            transformResponse: (response: unknown, _, quizId: string): Answer[] => {
                return (response as Answer[]).filter(a => a.id.startsWith(`a_${quizId}`))
            },
        }),
    }),
})

export default quizApi
export const { useGetQuizzesQuery, useGetQuizByIdQuery, useGetQuestionByIdQuery, useGetAnswersQuery } = quizApi
