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
    temp?: number;
    condition: IDisplayedCondition;
    wind_kph?: number;
    pressure_mb?: number;
    precip_mm?: number;
    feelslike?: number;
    vis_km?: number;
}
interface IDisplayedForecast {
    forecastdays?: IDisplayedForecastdays[]
}
interface IDisplayedForecastdays {
    date?: string;
    day?: IDisplayedDay;
    hours?: IDisplayedHours[]
}
interface IDisplayedDay {
    maxtemp?: number;
    mintemp?: number;
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
}
