export interface IDisplayedWeather {
    location?: IDisplayedLocation;
    current?: IDisplayedCurrent;
    forecast?: IDisplayedForecast;
}
interface IDisplayedLocation {
    name?: string;
    localtime?: string 
}
interface IDisplayedCurrent {
    temp?: string;
    condition: IDisplayedCondition;
    wind_kph?: number;
    pressure_mb?: number;
    precip_mm?: number;
    feelslike?: string;
    vis_km?: number;
}
export interface IDisplayedForecast {
    dayOfForecast?: string;
    forecastdays?: IDisplayedForecastdays[]
    hours?: IDisplayedHours[]
}
interface IDisplayedForecastdays {
    date?: string;
    day?: IDisplayedDay;
}
interface IDisplayedDay {
    maxtemp?: string;
    mintemp?: string;
    condition: IDisplayedCondition
}
interface IDisplayedCondition {
    text?: string;
    icon?: string
}
interface IDisplayedHours {
    time?: string;
    temp?: number;
    condition?: IDisplayedCondition;
    precip_mm?: number;
    wind_kph: number;
}
