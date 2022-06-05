import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/Current.module.scss'

const Current: FC = () => {
    const {weather, loading} = useAppSelector(state => state.weather)
    const {current} = weather
    const item = style.current__item
    return (
        <div className={style.current}>
            {loading && <h1>Is loading...</h1>}
            {Object.keys(weather).length !== 0 
            ?<>
            <img className={style.current__img} src={current?.condition?.icon} alt='current_weather'/>
            <div className={style.current__temp}>{current?.temp_c} °C</div>
            <div className={style.current__feelslike_c}>Feels like {current?.feelslike_c} °C</div>
            <div className={item}>Wind kph: {current?.wind_kph}</div>
            <div className={item}>Precip mm: {current?.precip_mm}</div>
            <div className={item}>Visibility km: {current?.vis_km}</div>
            <div className={item}>Pressure mb: {current?.pressure_mb}</div>
            </> :null}
        </div>
    );
};

export default Current; 