import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDisplayedWeather } from "../../../models/IDisplayedWeather";
import { IWeather } from "../../../models/IWeather";
import { displayedData } from "../../../utils/constans/displayedData";

interface WeatherState {
    weather: IWeather;
    displayedWeather: IDisplayedWeather;
    isCel: boolean;
    loading: boolean;
    city: string;
    error: string;
    forecastDetails: string
}

const initialState: WeatherState = {
    weather: {},
    displayedWeather: {},
    isCel: true,
    loading: false,
    city: 'Kiev',
    forecastDetails: 'summary',
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
            state.displayedWeather = displayedData(
                state.weather, 
                state.isCel, 
                state.weather.forecast?.forecastday[0].date
            )
        },
        selectedForecastDetails(state, action: PayloadAction<string>){
            state.forecastDetails = action.payload
        },
        selectedCity(state, action: PayloadAction<string>){
            state.city = action.payload
        },
        selectedDayOfForecast(state, action: PayloadAction<string | undefined>){
            if (state.displayedWeather.forecast) {
                state.displayedWeather.forecast.dayOfForecast = action.payload
            } 
        },
        selectedTempUnit(state, action: PayloadAction<boolean>){
            state.isCel = action.payload
            state.displayedWeather = displayedData(
                state.weather, 
                state.isCel, 
                state.displayedWeather.forecast!.dayOfForecast
            )
        },
        weatherFetchingError(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }
})

export default weatherSlice.reducer