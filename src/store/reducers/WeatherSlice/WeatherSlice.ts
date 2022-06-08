import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../../models/IWeather";
import { convertDate } from "../../../utils/helpers/convertDate";

interface IDisplayedDate {
    date: string;
    convertDate: string;
}

interface WeatherState {
    weather: IWeather;
    dayOfForecast?: string;
    displayedDate?: IDisplayedDate[];
    loading: boolean;
    error: string
}

const initialState: WeatherState = {
    weather: {},
    dayOfForecast: '',
    displayedDate: [],
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
            const forecastDay = action.payload.forecast?.forecastday
            state.loading = false
            state.error = ''
            state.weather = action.payload
            state.dayOfForecast = forecastDay?.[0].date
            state.displayedDate = forecastDay?.map(day => convertDate(day.date))
        },
        selectedDayOfForecast(state, action: PayloadAction<string>){
            state.dayOfForecast = action.payload
        },
        weatherFetchingError(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }
})

export default weatherSlice.reducer