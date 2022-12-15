import { configureStore } from '@reduxjs/toolkit'
import MainViewReducer from './MainViewSlice'

export const store = configureStore({
  reducer: {
    MainView: MainViewReducer
  }
})