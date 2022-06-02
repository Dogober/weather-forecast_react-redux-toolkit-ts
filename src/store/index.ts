import { configureStore } from "@reduxjs/toolkit"
import currentWeatherReducer from './reducers/ForecastSlice/ForecastSlice'

export const store = configureStore({
    reducer: {
        currentWeatherReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

