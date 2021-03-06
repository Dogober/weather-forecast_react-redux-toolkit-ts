import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/Current.module.scss'

const Current: FC = () => {
    const { displayedWeather } = useAppSelector(state => state.weather)
    const { current } = displayedWeather
    const item = style.current__item
    return (
        <div className={style.current}>
            <img className={style.current__img} src={current?.condition?.icon} alt='weather'/>
            <div className={style.current__temp}>{current?.temp}</div>
            <div className={style.current__feelslike_c}>Feels like {current?.feelslike}</div>
            <div className={item}>Wind kph: {current?.wind_kph}</div>
            <div className={item}>Precip mm: {current?.precip_mm}</div>
            <div className={item}>Visibility km: {current?.vis_km}</div>
            <div className={item}>Pressure mb: {current?.pressure_mb}</div>
        </div>
    );
};

export default Current; 