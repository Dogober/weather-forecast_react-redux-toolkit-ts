import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDetailsWidth, setHourlyWidthItem, setSelectedHour } from '../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC= () => {
    const {forecastDay} = useAppSelector(state => state.weather.displayedHourlyWeather)
    const {hourlyOffset, selectedHour} = useAppSelector(state => state.weather)
    const hourContainerRef = useRef<HTMLDivElement>(null)
    const hourRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log("useEffect отработал")
        dispatch(setHourlyWidthItem(hourRef.current?.offsetWidth))
        const resizeHandler = () => {
            dispatch(setDetailsWidth(hourContainerRef.current?.offsetWidth))
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    return (
        <div 
            className={style.forecastDetails__hourly}
            ref={hourContainerRef}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    position: 'relative',
                    transition: '1s',
                    transform: `translateX(-${hourlyOffset}px)`,
                }}
            >
                {forecastDay?.hours?.map((el, i) =>
                    <div 
                        className={style.forecastDetails__hourlyItemContainer}
                        ref={hourRef}
                        key={i}
                    >
                        <div 
                            className={style.forecastDetails__hourlyItem}
                            onClick={() => dispatch(setSelectedHour(i))}
                        >
                            <img
                                className={style.forecastDetails__hourlyItem__img}
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
                            <div className={style.forecastDetails__hourlyItem__time}>
                                {el.time}
                            </div>
                        </div>
                        <div 
                            className={selectedHour === i 
                                ?style.forecastDetails__hourlyItem__moreActive
                                :style.forecastDetails__hourlyItem__moreInactive
                            }
                        >
                            {i}
                        </div>
                    </div>
                )}
            </div >
        </div>
    );
};

export default HourlyForecast;