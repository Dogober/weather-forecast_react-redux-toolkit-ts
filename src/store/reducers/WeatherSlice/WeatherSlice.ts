import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDisplayedWeather } from "../../../models/IDisplayedWeather";
import { IDisplayedHourlyWeather } from "../../../models/IDisplayesHourlyWeather";
import { IWeather } from "../../../models/IWeather";
import { displayedData } from "../../../utils/constans/displayedData";
import { displayedHourlyData } from "../../../utils/constans/displayedHourlyData";

interface WeatherState {
    weather: IWeather;
    displayedWeather: IDisplayedWeather;
    displayedHourlyWeather: IDisplayedHourlyWeather;
    isCel: boolean;
    loading: boolean;
    city?: string;
    error: string;
    forecastDetails: string;
    hourlyOffset: number;
    detailsWidth: number | undefined;
    hourlyWidthItem: number | undefined;
}

const initialState: WeatherState = {
    weather: {},
    displayedWeather: {},
    displayedHourlyWeather: {},
    isCel: true,
    loading: false,
    city: 'Kiev',
    forecastDetails: 'summary',
    error: '',
    hourlyOffset: 0,
    detailsWidth: undefined,
    hourlyWidthItem: undefined
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        weatherFetching(state){
            state.loading = true
            state.displayedWeather = {}
            state.displayedHourlyWeather = {}
            state.error = ''
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
            state.displayedHourlyWeather = displayedHourlyData(
                state.weather.forecast?.forecastday, 
                state.isCel,
                state.weather.forecast?.forecastday[0].date,
            )
        },
        selectedForecastDetails(state, action: PayloadAction<string>){
            state.forecastDetails = action.payload
        },
        setHourlyOffset(state, action: PayloadAction<number>) {
            state.hourlyOffset = action.payload
        },
        setDetailsWidth(state, action: PayloadAction<number | undefined>){
            const hoursNumber = state.displayedHourlyWeather.forecastDay?.hours?.length! + 1
            state.detailsWidth = action.payload
            const otherHoursWidth = ((hoursNumber) * state.hourlyWidthItem!) - state.detailsWidth!
            if (state.hourlyOffset > otherHoursWidth) {
               state.hourlyOffset = otherHoursWidth
            }
        },
        setHourlyWidthItem(state, action: PayloadAction<number | undefined>){
            state.hourlyWidthItem = action.payload
        },
        selectedCity(state, action: PayloadAction<string>){
            state.city = action.payload
        },
        selectedDayOfForecast(state, action: PayloadAction<string | undefined>){
            if (state.displayedWeather.forecast) {
                state.displayedWeather.forecast.dayOfForecast = action.payload
            }
            state.displayedHourlyWeather = displayedHourlyData(
                state.weather.forecast?.forecastday, 
                state.isCel,
                action.payload,
            )
            state.hourlyOffset = 0
        },
        selectedTempUnit(state, action: PayloadAction<boolean>){
            state.isCel = action.payload
            state.displayedWeather = displayedData(
                state.weather, 
                state.isCel, 
                state.displayedWeather.forecast?.dayOfForecast
            )
            state.displayedHourlyWeather = displayedHourlyData(
                state.weather.forecast?.forecastday, 
                state.isCel,
                state.displayedHourlyWeather.dayOfForecast,
            )
        },
        weatherFetchingError(state, action: PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }
})

export default weatherSlice.reducer