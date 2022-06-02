import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCurrentWeather } from '../store/reducers/ForecastSlice/ActionCreators';
import style from '../views/MainPage/MainPage.module.scss'

const CurrentWeather: FC = () => {
    const {current_weather, loading, error} = useAppSelector(state => state.currentWeatherReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCurrentWeather())
    }, [])
console.log(current_weather)
    return (
        <section className={style.main__currentWeather}>
            {loading && <h1>Is loading...</h1>}
            {error && <h1>{error}</h1>}
            {current_weather.location?.country}
        </section>
    );
};

export default CurrentWeather;