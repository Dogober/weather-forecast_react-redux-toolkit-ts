import { FC } from 'react';
import { useAppDispatch } from '../hooks';
import { IDisplayedHours } from '../models/IDisplayesHourlyWeather';
import { setSelectedHour } from '../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/HourlyForecast.module.scss'

interface HoutlyItemPropms {
    hour: IDisplayedHours;
    hourIndex: number;
}
const HoutlyItem: FC<HoutlyItemPropms> = ({hour, hourIndex}) => {
    const dispatch = useAppDispatch()
    return (
        <div 
            className={style.forecastDetails__hourlyItem}
            onClick={() => dispatch(setSelectedHour(hourIndex))}
        >
            <img
                className={style.forecastDetails__hourlyItem__img}
                src={hour.condition?.icon}
            />
            <div className={style.forecastDetails__hourlyItem__temp}>
                {hour.temp}°
            </div>
            <div className={style.forecastDetails__hourlyItem__condition}>
                {hour.condition?.text}
            </div>
            <div className={style.forecastDetails__hourlyItem__precip}>
                {hour.precip_mm} mm
            </div>
            <div className={style.forecastDetails__hourlyItem__wind}>
                {hour.wind_kph} kp/h
            </div>
            <div className={style.forecastDetails__hourlyItem__time}>
                {hour.time}
            </div>
        </div>
    );
};

export default HoutlyItem;