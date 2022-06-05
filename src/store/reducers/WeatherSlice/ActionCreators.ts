import axios from "axios";
import { AppDispatch } from "../..";
import { IWeather } from "../../../models/IWeather";
import { weatherSlice } from "./WeatherSlice";

const {
    weatherFetching, 
    weatherFetchingError, 
    weatherFetchingSuccess
} = weatherSlice.actions

export const fetchWeather = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(weatherFetching())
        const response = await axios.get<IWeather>(
            'http://api.weatherapi.com/v1/forecast.json?key=4371ead6bca843c796f193609222905&q=Kiev&days=3&aqi=yes&alerts=yes'
        )
        setTimeout(async ()  => {
            dispatch(weatherFetchingSuccess(response.data))
        }, 500)
    } catch (error: any) {
        dispatch(weatherFetchingError(error.message))
    }
}