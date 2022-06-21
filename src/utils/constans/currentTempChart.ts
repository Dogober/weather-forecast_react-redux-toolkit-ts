import { IDisplayedForecast } from "../../models/IDisplayedWeather"

export const currentTempChart = (forecast?: IDisplayedForecast) => {  
    const currentDay = forecast?.forecastdays?.find(el => el.date === forecast.dayOfForecast)
    const currentDayIndex = forecast?.forecastdays?.indexOf(currentDay!)
    let stepOffset = 0
    let offset = (window.innerWidth - 50) > 1316 ?1316 :(window.innerWidth - 50)
    stepOffset = offset * currentDayIndex!
    return stepOffset
}
