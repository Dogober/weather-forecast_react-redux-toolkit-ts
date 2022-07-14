import { FC } from 'react';
import { useAppSelector } from '../hooks';
import { IDisplayedHours } from '../models/IDisplayesHourlyWeather';
import style from './styles/HourlyForecast.module.scss'

interface SelectedHourProps {
    hour: IDisplayedHours;
    hourIndex: number;
}

const SelectedHour: FC<SelectedHourProps> = ({hour, hourIndex}) => {
    const {selectedHour} = useAppSelector(state => state.weather)
    return (
        <div 
            className={selectedHour === hourIndex 
                ?style.forecastDetails__hourlyItem__moreActive
                :style.forecastDetails__hourlyItem__moreInactive
            }
        >
            <div className={style.forecastDetails__hourlyItem__moreActive__param}>
                Feelslike: {hour.feelslike}°
            </div>
            <div className={style.forecastDetails__hourlyItem__moreActive__param}>
                Dewpoint: {hour.dewpoint}°
            </div>
            <div className={style.forecastDetails__hourlyItem__moreActive__param}>
                Gust: {hour.gust_kph} kp/h
            </div>
            <div className={style.forecastDetails__hourlyItem__moreActive__param}>
                UV index: {hour.uv}
            </div>
            <div className={style.forecastDetails__hourlyItem__moreActive__param}>
                Visibility: {hour.vis_km} km
            </div>
        </div>
    );
};

export default SelectedHour;