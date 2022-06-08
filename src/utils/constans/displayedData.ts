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
            temp: tempCondition ?current?.temp_c.toString() +' °C' :current?.temp_f.toString() +' °F',
            condition: {
                text: current?.condition.text,
                icon: current?.condition.icon,

            },
        wind_kph: current?.wind_kph,
        pressure_mb: current?.pressure_mb,
        precip_mm: current?.precip_mm,
        feelslike: tempCondition ?current?.feelslike_c.toString() +' °C' 
                                 :current?.feelslike_f.toString() +' °F',
        vis_km: current?.vis_km
        },
        forecast: {
            forecastdays: forecast?.forecastday.map(day => el = {
                date: day.date,
                day: {
                    maxtemp: tempCondition ?day.day.maxtemp_c.toString() +' °C' 
                                           :day.day.maxtemp_f.toString() +' °F',
                    mintemp: tempCondition ?day.day.mintemp_c.toString() +' °C' 
                                           :day.day.mintemp_f.toString() +' °F',
                    condition: {
                        icon: day.day.condition.icon,
                        text: day.day.condition.text
                    }          
                },
                hours: day.hour.map(hour => el = {
                    time: hour.time,
                    temp: tempCondition ?hour.temp_c.toString() +' °C' :hour.temp_f.toString() +' °F',
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