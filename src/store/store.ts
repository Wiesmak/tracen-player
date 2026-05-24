import { type Action, configureStore, type ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import quizStateReducer, { addQuizStateListener } from "@/features/quiz/slice"
import quizApi from "@/services/quiz-api"
import listenerMiddleware from "@/store/listeners"

const store = configureStore({
    reducer: {
        [quizApi.reducerPath]: quizApi.reducer,
        quizState: quizStateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware)
            .concat(quizApi.middleware),
});

setupListeners(store.dispatch)

addQuizStateListener()

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>