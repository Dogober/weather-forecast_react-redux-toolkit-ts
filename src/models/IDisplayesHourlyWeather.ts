export interface IDisplayedHourlyWeather{
    forecastDay?: IDisplayedHourlyForecaastDay;
    dayOfForecast?: string;
}
interface IDisplayedHourlyForecaastDay {
    hours?: IDisplayedHours[];
    date?: string;
}
export interface IDisplayedHours {
    time?: string;
    temp?: number;
    condition?: IDisplayedHourlyCondition;
    precip_mm?: number;
    wind_kph?: number;
    gust_kph?: number;
    vis_km?: number;
    uv?: number;
    feelslike?: number;
    dewpoint?: number;
}
interface IDisplayedHourlyCondition {
    text?: string;
    icon?: string;
}