import axios from "axios";
import { AppDispatch } from "../..";
import { IParams } from "../../../models/IParams";
import { IWeather } from "../../../models/IWeather";
import { weatherSlice } from "./WeatherSlice";

export const {
    weatherFetching, 
    weatherFetchingError, 
    weatherFetchingSuccess,
    selectedDayOfForecast,
    selectedForecastDetails,
    selectedTempUnit,
    selectedCity,
} = weatherSlice.actions
export const fetchWeather = (city?: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(weatherFetching())
        const response = await axios.get<IWeather>(
            'https://api.weatherapi.com/v1/forecast.json?', {
                params: <IParams> {
                    key: '4371ead6bca843c796f193609222905', 
                    q: city,
                    lang: 'en',
                    days: 3,
                    aqi: 'yes',
                    alerts: 'yes'
                }
            }
        )
        setTimeout(async ()  => {
            dispatch(weatherFetchingSuccess(response.data))
        }, 500)
    } catch (error: any) {
        dispatch(weatherFetchingError(error.message))
    }
}