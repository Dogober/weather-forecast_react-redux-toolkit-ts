import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDetailsWidth, setHourlyWidthItem } from '../store/reducers/WeatherSlice/ActionCreators';
import HoutlyItem from './HoutlyItem';
import SelectedHour from './SelectedHour';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC= () => {
    const {forecastDay} = useAppSelector(state => state.weather.displayedHourlyWeather)
    const {hourlyOffset} = useAppSelector(state => state.weather)
    const hourContainerRef = useRef<HTMLDivElement>(null)
    const hourRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("useEffect in hourly отработал")
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
                        <HoutlyItem hour={el} hourIndex={i} />
                        <SelectedHour hour={el} hourIndex={i}/>
                    </div>
                )}
            </div >
        </div>
    );
};

export default HourlyForecast;