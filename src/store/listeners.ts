import { addListener, createListenerMiddleware } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "@/store/store"

const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware
    .startListening
    .withTypes<RootState, AppDispatch>()

export const addAppListener = addListener
    .withTypes<RootState, AppDispatch>()

export default listenerMiddleware.middleware