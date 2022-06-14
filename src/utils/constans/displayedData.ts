import { IDisplayedWeather } from "../../models/IDisplayedWeather";
import { IWeather } from "../../models/IWeather";
type displayedDataParams = (
    weather: IWeather, 
    isCel: boolean,
    dayOfForecast?: string
) => IDisplayedWeather
const cel = ' °C'
const fah = ' °F'
const selectedTempUnit = (tempInCel?: number, tempInFah?: number, isCel?: boolean) => {
    return isCel ?tempInCel?.toString() + cel :tempInFah?.toString() + fah
}
export const displayedData: displayedDataParams = (weather, isCel, dayOfForecast) => {

    const {current, location, forecast} = weather
    let el = {}
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
            forecastdays: forecast?.forecastday.map(day => el = {
                date: day.date,
                day: {
                    maxtemp: selectedTempUnit(day.day.maxtemp_c, day.day.maxtemp_f, isCel),
                    mintemp: selectedTempUnit(day.day.mintemp_c, day.day.mintemp_f, isCel),
                    condition: {
                        icon: day.day.condition.icon,
                        text: day.day.condition.text
                    }          
                },
                hours: day.hour.map(hour => el = {
                    time: hour.time,
                    temp: isCel ?hour.temp_c :hour.temp_f,
                    condition: {
                        text: hour.condition.text,
                        icon: hour.condition.icon
                    }, 
                })
            })
        }
    }
    
    return displayedWeather
}