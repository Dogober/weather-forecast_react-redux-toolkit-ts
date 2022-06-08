export interface IWeather {
    location?: ILocation;
    current?: ICurrent;
    forecast?: IForecast;
    alerts?: IAlerts
}
interface IAlerts {
    alert: any
}
interface ILocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string 
}
interface ICurrent {
    temp_c: number;
    temp_f: number;
    condition: ICondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    air_quality: IAir_quality
}
interface IAir_quality {
    co: number;
    no2:number;
    o3: number;
    so2:number
}
interface IForecast {
    forecastday: IForecastday[]
}
interface IForecastday {
    date: string;
    date_epoch: number;
    day: IDay;
    hour: IHour[]
}
interface IDay {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    mintemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    condition: ICondition
}
interface ICondition {
    text: string;
    icon: string
}
interface IHour {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: ICondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    gust_mph: number;
    gust_kph: number
}
