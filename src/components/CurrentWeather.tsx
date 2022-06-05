import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Current from './Current';
import Location from './Location';
import style from './styles/CurrentWeather.module.scss'

const CurrentWeather: FC = () => {
    const {error} = useAppSelector(state => state.weather)
    return (
        <section className={style.currentWeather}>
            <Location />
            <Current />
            {error && <h1>{error}</h1>}
        </section>
    );
};

export default CurrentWeather;