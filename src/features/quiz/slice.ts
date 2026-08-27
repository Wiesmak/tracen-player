import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import addFetchAnswersListener from "@/features/quiz/listeners/fetch-answers"

export enum QuizMode {
    EASY = "EASY",
    HARD = "HARD",
}

interface QuizState {
    quiz: string,
    progress: number,
    subProgress: number,
    score: number,
    mode: QuizMode
    currentAnswers: string[],
    currentQuestions: string[],
    currentSelectorInput: Nullable<string>,
    currentSelection: Nullable<string>,
    isRevealed: boolean,
    isTimedOut: boolean,
    canEnlarge: boolean,
}

type Progress = Partial<Omit<QuizState, 'quiz' | 'currentAnswers' | 'currentQuestions' | 'currentSelection' | 'mode' | 'currentSelectorInput' | 'canEnlarge'>>

const quizStateInitialState = {
    quiz: "",
    progress: 0,
    subProgress: 0,
    score: 0,
    mode: QuizMode.EASY,
    currentAnswers: [],
    currentQuestions: [],
    currentSelectorInput: null,
    currentSelection: null,
    isRevealed: false,
    isTimedOut: false,
    canEnlarge: false,
} satisfies QuizState as QuizState

interface StartQuizParams {
    quizId: string,
    quizMode: QuizMode,
    questions: string[]
}

type PrepareQuizParams = Omit<StartQuizParams, 'questions'>

const quizStateSlice = createSlice({
    name: "quizState",
    initialState: quizStateInitialState,
    reducers: {
        prepareQuiz: (state, action: PayloadAction<PrepareQuizParams>) => {
            const { quizId, quizMode } = action.payload
            state.quiz = quizId
            state.mode = quizMode
        },
        startQuiz: (_, action: PayloadAction<StartQuizParams>) => {
            const {quizId, quizMode, questions} = action.payload
            return {
                ...quizStateInitialState,
                quiz: quizId,
                mode: quizMode,
                currentQuestions: questions,
            }
        },
        endQuiz: () => {
            return quizStateInitialState
        },
        progressQuiz: (state: QuizState, action: PayloadAction<Progress>) => {
            const isQuestionChange = action.payload.progress !== undefined
                && action.payload.progress !== state.progress

            return {
                ...state,
                ...action.payload,
                currentAnswers: isQuestionChange ? [] : state.currentAnswers,
                currentSelection: isQuestionChange ? null : state.currentSelection,
                currentSelectorInput: null,
                isTimedOut: isQuestionChange ? false : (action.payload.isTimedOut ?? state.isTimedOut),
                canEnlarge: isQuestionChange || action.payload.isRevealed === true
                    ? false
                    : state.canEnlarge,
            }
        },
        setCurrentAnswers: (state: QuizState, action: PayloadAction<string[]>) => {
            state.currentAnswers = action.payload
        },
        setCurrentSelection: (state: QuizState, action: PayloadAction<Nullable<string>>) => {
            state.currentSelection = action.payload
        },
        setCurrentSelectorInput: (state: QuizState, action: PayloadAction<string>) => {
            state.currentSelectorInput = action.payload
        },
        setCanEnlarge: (state: QuizState, action: PayloadAction<boolean>) => {
            state.canEnlarge = action.payload
        }
    },
    selectors: {
        selectCurrentQuizId: (state: QuizState) => state.quiz,
        selectProgress: (state: QuizState) => state.progress,
        selectSubProgress: (state: QuizState) => state.subProgress,
        selectScore: (state: QuizState) => state.score,
        selectIsQuizActive: (state: QuizState) => state.quiz !== "",
        selectCurrentAnswers: (state: QuizState) => state.currentAnswers,
        selectCurrentQuestions: (state: QuizState) => state.currentQuestions,
        selectCurrentSelection: (state: QuizState) => state.currentSelection,
        selectQuizMode: (state: QuizState) => state.mode,
        selectCurrentSelectorInput: (state: QuizState) => state.currentSelectorInput,
        selectIsRevealed: (state: QuizState) => state.isRevealed,
        selectIsTimedOut: (state: QuizState) => state.isTimedOut,
        selectCanEnlarge: (state: QuizState) => state.canEnlarge,
    },
})

export const addQuizStateListener = () => {
    addFetchAnswersListener()
}

export default quizStateSlice.reducer
export const {
    prepareQuiz,
    startQuiz,
    endQuiz,
    progressQuiz,
    setCurrentAnswers,
    setCurrentSelection,
    setCurrentSelectorInput,
    setCanEnlarge,
} = quizStateSlice.actions
export const {
    selectCurrentQuizId,
    selectProgress,
    selectSubProgress,
    selectScore,
    selectIsQuizActive,
    selectCurrentAnswers,
    selectCurrentQuestions,
    selectCurrentSelection,
    selectQuizMode,
    selectCurrentSelectorInput,
    selectIsRevealed,
    selectIsTimedOut,
    selectCanEnlarge,
} = quizStateSlice.selectors