import { IDisplayedForecast } from "../../models/IDisplayedWeather"

export const currentTempChart = (forecast?: IDisplayedForecast) => {  
    const currentDay = forecast?.forecastdays?.find(el => el.date === forecast.dayOfForecast)
    const currentDayIndex = forecast?.forecastdays?.indexOf(currentDay!)
    const canvasWidth = 3927
    let stepOffset = 0
    let offset = canvasWidth/forecast?.forecastdays?.length!
    stepOffset = offset * currentDayIndex!
    return stepOffset
}
