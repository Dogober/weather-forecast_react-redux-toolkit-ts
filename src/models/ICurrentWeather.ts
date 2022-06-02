interface ILocation {
    name?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
    localtime?: string 
}
interface ICondition {
    icon?: string
}
interface ICurrent {
    temp_c?: number;
    condition?: ICondition;
    wind_kph?: number;
    wind_degree?: number;
    wind_dir?: string;
    pressure_mb?: number;
    precip_mm?: number;
    cloud?: number;
    feelslike?: number
}
export interface ICurrentWeather {
    location?: ILocation;
    current?: ICurrent
}