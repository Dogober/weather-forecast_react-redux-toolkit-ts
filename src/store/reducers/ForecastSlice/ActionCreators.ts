import axios from "axios";
import { AppDispatch } from "../..";
import { ICurrentWeather } from "../../../models/ICurrentWeather";
import { currentWeatherSlice } from "./ForecastSlice";

const {
    currentWeatherFetching, 
    currentWeatherFetchingError, 
    currentWeatherFetchingSuccess
} = currentWeatherSlice.actions

export const fetchCurrentWeather = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentWeatherFetching())
        const response = await axios.get<ICurrentWeather>(
            'http://api.weatherapi.com/v1/current.json?key=4371ead6bca843c796f193609222905&q=Kiev&aqi=no'
        )
        setTimeout(async ()  => {
            dispatch(currentWeatherFetchingSuccess(response.data))
        }, 500)
    } catch (error: any) {
        dispatch(currentWeatherFetchingError(error.message))
    }
}