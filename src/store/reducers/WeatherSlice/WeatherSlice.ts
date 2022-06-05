import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../../models/IWeather";

interface CurrentWeatherState {
    weather: IWeather;
    loading: boolean;
    error: string
}

const initialState: CurrentWeatherState = {
    weather: {},
    loading: false,
    error: ''
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        weatherFetching(state){
            state.loading = true
        },
        weatherFetchingSuccess(state, action: PayloadAction<IWeather>){
            state.loading = false
            state.error = ''
            state.weather = action.payload
        },
        weatherFetchingError(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }
})

export default weatherSlice.reducer