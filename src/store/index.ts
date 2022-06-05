import { configureStore } from "@reduxjs/toolkit"
import weather from './reducers/WeatherSlice/WeatherSlice'

export const store = configureStore({
    reducer: {
        weather
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

