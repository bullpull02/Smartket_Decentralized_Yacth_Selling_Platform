import { configureStore } from '@reduxjs/toolkit'
import user from 'slices/user'
import modal from 'slices/modal'

export const store = configureStore({
  reducer: {
    user,
    modal,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
