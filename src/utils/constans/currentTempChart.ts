import { IDisplayedForecast } from "../../models/IDisplayedWeather"

export const currentTempChart = (forecast?: IDisplayedForecast, detailsWidth?: number) => {  
    const currentDay = forecast?.forecastdays?.find(el => el.date === forecast.dayOfForecast)
    const currentDayIndex = forecast?.forecastdays?.indexOf(currentDay!)
    let stepOffset = 0
    let offset = detailsWidth! > 1316 ?1316 :detailsWidth!
    stepOffset = offset * currentDayIndex!
    return stepOffset
}
