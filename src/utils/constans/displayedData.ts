import { IDisplayedWeather } from "../../models/IDisplayedWeather";
import { IWeather } from "../../models/IWeather";
type displayedDataType = (
    weather: IWeather, 
    isCel: boolean,
    dayOfForecast?: string
) => IDisplayedWeather
const cel = ' °C'
const fah = ' °F'
const selectedTempUnit = (tempInCel?: number, tempInFah?: number, isCel?: boolean) => {
    return isCel ?tempInCel?.toString() + cel :tempInFah?.toString() + fah
}
const regExp = /(\w+\s\w+)/g
export const displayedData: displayedDataType = (weather, isCel, dayOfForecast) => {

    const {current, location, forecast} = weather
    const displayedWeather = {
        location: {
            name: location?.name,
            localtime: location?.localtime
        },
        current: {
            temp: selectedTempUnit(current?.temp_c, current?.temp_f, isCel),
            condition: {
                text: current?.condition.text,
                icon: current?.condition.icon,

            },
            wind_kph: current?.wind_kph,
            pressure_mb: current?.pressure_mb,
            precip_mm: current?.precip_mm,
            feelslike: selectedTempUnit(current?.feelslike_c, current?.feelslike_f, isCel),
            vis_km: current?.vis_km
        },
        forecast: {
            dayOfForecast: dayOfForecast,
            forecastdays: forecast?.forecastday.map(day => ({
                date: day.date,
                day: {
                    maxtemp: selectedTempUnit(day.day.maxtemp_c, day.day.maxtemp_f, isCel),
                    mintemp: selectedTempUnit(day.day.mintemp_c, day.day.mintemp_f, isCel),
                    condition: {
                        icon: day.day.condition.icon,
                        text: day.day.condition.text
                    }
                },
            })),
            hours: forecast?.forecastday.map(el => el.hour).flat().map(hour => ({
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
        }
    }
    
    return displayedWeather
}