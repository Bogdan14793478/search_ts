import { configureStore } from '@reduxjs/toolkit'
import petsSlice from '@/store/pets/reducer'

const store = configureStore({
  reducer: { pets: petsSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
