import { IDisplayedHourlyWeather } from "../../models/IDisplayesHourlyWeather";
import { IForecastday } from "../../models/IWeather";

type displayedHourlyDataType = (
    forecastDay?: IForecastday[],
    isCel?: boolean,
    dayOfForecast?: string,
) => IDisplayedHourlyWeather
const dateFilter = (date: string) => {
    let hours = date.split(/[\s\:]/)[1]
    if (+hours === 0) {
        return '12 AM'
    } else if (+hours < 12) {
        return hours + ' AM'
    } else if (+hours === 12){
        return '12 PM'
    }
    return +hours - 12 + ' PM'
}

export const displayedHourlyData: displayedHourlyDataType = (forecastDay, isCel, dayOfForecast) => {
    const currentDay = forecastDay?.find(el => el.date === dayOfForecast)
    const displayedHourlyWeather = {
            dayOfForecast: dayOfForecast,
            forecastDay: {
                date: currentDay?.date,
                hours: currentDay?.hour.map(hour => ({
                    time: dateFilter(hour.time),
                    temp: isCel ?hour.temp_c :hour.temp_f,
                    condition: {
                        text: hour.condition.text,
                        icon: hour.condition.icon
                    },
                    precip_mm: hour.precip_mm,
                    wind_kph: hour.wind_kph,
                    gust_kph: hour.gust_kph,
                    vis_km: hour.vis_km,
                    uv: hour.uv,
                    feelslike: isCel ?hour.feelslike_c :hour.feelslike_f,
                    dewpoint: isCel ?hour.dewpoint_c :hour.dewpoint_f,
                }))
            },
        }
    return displayedHourlyWeather
}
