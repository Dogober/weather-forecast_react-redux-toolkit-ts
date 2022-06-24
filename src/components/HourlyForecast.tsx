import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC= () => {
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    // const currentDay = forecast?.forecastdays?.dayOfForecast
    return (
        <div className={style.forecastDetails__hourly}>
            <div className={style.forecastDetails__container}>
                {forecast?.hours?.map((el, i) => 
                    <div 
                        className={style.forecastDetails__hourlyItem}
                        key={i}
                    >
                        <img
                            className={style.forecastDetails__hourlyItem__img}
                            key={i}
                            src={el.condition?.icon}
                        />
                        <div className={style.forecastDetails__hourlyItem__temp}>
                            {el.temp}°
                        </div>
                        <div className={style.forecastDetails__hourlyItem__condition}>
                            {el.condition?.text}
                        </div>
                        <div className={style.forecastDetails__hourlyItem__precip}>
                            {el.precip_mm} mm
                        </div>
                        <div className={style.forecastDetails__hourlyItem__wind}>
                            {el.wind_kph} kp/h
                        </div>
                    </div>
                )}
            </div >
            <div className={style.forecastDetails__time}>
                {forecast?.hours?.map((el, i) =>
                    <div 
                        className={style.forecastDetails__time__item}
                        key={i}
                    >
                        {el.time}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HourlyForecast;