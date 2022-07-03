import { IDisplayedHourlyWeather } from "../../models/IDisplayesHourlyWeather";
import { IForecastday } from "../../models/IWeather";

type displayedHourlyDataType = (
    forecastDay?: IForecastday[],
    isCel?: boolean,
    dayOfForecast?: string,
) => IDisplayedHourlyWeather
const regExp = /(\w+\s\w+)/g

export const displayedHourlyData: displayedHourlyDataType = (forecastDay, isCel, dayOfForecast) => {
    const currentDay = forecastDay?.find(el => el.date === dayOfForecast)
    const displayedHourlyWeather = {
            dayOfForecast: dayOfForecast,
            forecastDay: {
                date: currentDay?.date,
                hours: currentDay?.hour.map(hour => ({
                    time: new Date(hour.time).toLocaleDateString('en-us', { hour: '2-digit' })
                        .match(regExp)![0],
                    temp: isCel ?hour.temp_c :hour.temp_f,
                    condition: {
                        text: hour.condition.text,
                        icon: hour.condition.icon
                    },
                    precip_mm: hour.precip_mm,
                    wind_kph: hour.wind_kph
                }))
            },
        }
    return displayedHourlyWeather
}
