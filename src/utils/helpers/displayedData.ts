import { IDisplayedWeather } from "../../models/IDisplayedWeather";
import { IWeather } from "../../models/IWeather";

export const displayedData = (weather: IWeather, tempUnit: string): IDisplayedWeather => {
    const {current, location, forecast} = weather
    let el = {}
    let tempCondition = tempUnit === '°C' 
    const displayedWeather = {
        location: {
            name: location?.name,
            localtime: location?.localtime
        },
        current: {
            temp: tempCondition ?current?.temp_c :current?.temp_f,
            condition: {
                text: current?.condition.text,
                icon: current?.condition.icon,

            },
        wind_kph: current?.wind_kph,
        pressure_mb: current?.pressure_mb,
        precip_mm: current?.precip_mm,
        feelslike: tempCondition ?current?.feelslike_c :current?.feelslike_f,
        vis_km: current?.vis_km
        },
        forecast: {
            forecastdays: forecast?.forecastday.map(day => el = {
                date: day.date,
                day: {
                    maxtemp: tempCondition ?day.day.maxtemp_c :day.day.maxtemp_f,
                    mintemp: tempCondition ?day.day.mintemp_c :day.day.mintemp_f,
                    condition: {
                        icon: day.day.condition.icon,
                        text: day.day.condition.text
                    }          
                },
                hours: day.hour.map(hour => el = {
                    time: hour.time,
                    temp: tempCondition ?hour.temp_c :hour.temp_f,
                    condition: {
                        text: hour.condition.text,
                        icon: hour.condition.icon
                    }
                })
            })
        }
    }

    return displayedWeather
}