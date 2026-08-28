import { describe, expect, it } from "vitest"
import reducer, {
    ensureQuestionDeadline,
    progressQuiz,
    QuizMode,
    startQuiz,
} from "@/features/quiz/slice"

describe("question timer deadline", () => {
    it("survives rerenders and resets only when the question changes", () => {
        let state = reducer(undefined, {type: "test/init"})
        state = reducer(state, startQuiz({
            quizId: "quiz",
            quizMode: QuizMode.EASY,
            questions: ["q1", "q2"],
        }))

        state = reducer(state, ensureQuestionDeadline({
            questionId: "q1",
            deadline: 12345,
        }))
        state = reducer(state, ensureQuestionDeadline({
            questionId: "q1",
            deadline: 99999,
        }))

        expect(state.questionDeadline).toBe(12345)

        state = reducer(state, progressQuiz({isRevealed: true}))
        expect(state.questionDeadline).toBe(12345)

        state = reducer(state, progressQuiz({progress: 1}))
        expect(state.questionDeadline).toBeNull()
    })
})
