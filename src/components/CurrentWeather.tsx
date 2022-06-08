import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import Current from './Current';
import Location from './Location';
import style from './styles/CurrentWeather.module.scss'

const CurrentWeather: FC = () => {
    return (
        <section className={style.currentWeather}>
            <Location />
            <Current />
        </section>
    );
};

export default CurrentWeather;