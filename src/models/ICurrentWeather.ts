export interface ILocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string 
}
interface ICondition {
    icon: string
}
interface ICurrent {
    temp_c: number;
    condition: ICondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number
}
export interface ICurrentWeather {
    location?: ILocation;
    current?: ICurrent
}