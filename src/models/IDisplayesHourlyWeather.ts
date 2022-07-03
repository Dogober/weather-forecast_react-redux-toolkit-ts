export interface IDisplayedHourlyWeather{
    forecastDay?: IDisplayedHourlyForecaastDay;
    dayOfForecast?: string;
}
interface IDisplayedHourlyForecaastDay {
    hours?: IDisplayedHours[];
    date?: string;
}
interface IDisplayedHours {
    time?: string;
    temp?: number;
    condition?: IDisplayedHourlyCondition;
    precip_mm?: number;
    wind_kph?: number;
}
interface IDisplayedHourlyCondition {
    text?: string;
    icon?: string;
}