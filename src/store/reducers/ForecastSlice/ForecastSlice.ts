import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentWeather } from "../../../models/ICurrentWeather";

interface CurrentWeatherState {
    current_weather: ICurrentWeather;
    loading: boolean;
    error: string
}

const initialState: CurrentWeatherState = {
    current_weather: {},
    loading: false,
    error: ''
}

export const currentWeatherSlice = createSlice({
    name: 'current_weather',
    initialState,
    reducers: {
        currentWeatherFetching(state){
            state.loading = true
        },
        currentWeatherFetchingSuccess(state, action: PayloadAction<ICurrentWeather>){
            state.loading = false
            state.error = ''
            state.current_weather = action.payload
        },
        currentWeatherFetchingError(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }
})

export default currentWeatherSlice.reducer