import { configureStore } from "@reduxjs/toolkit"
import weather from './reducers/WeatherSlice/WeatherSlice'
import searchLocation from './reducers/SearchLocationSlice/SearchLocationSlice'

export const store = configureStore({
    reducer: {
        weather,
        searchLocation,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

