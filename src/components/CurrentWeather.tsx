import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCurrentWeather } from '../store/reducers/ForecastSlice/ActionCreators';
import Current from './Current';
import Location from './Location';
import style from './styles/CurrentWeather.module.scss'

const CurrentWeather: FC = () => {
    const {error} = useAppSelector(state => state.currentWeatherReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCurrentWeather())
    }, [])
    return (
        <section className={style.currentWeather}>
            <Location />
            <Current />
            {error && <h1>{error}</h1>}
        </section>
    );
};

export default CurrentWeather;