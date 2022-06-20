import { FC, useEffect } from 'react';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastFor3Days from '../../components/ForecastFor3Days';
import HourlyForecast from '../../components/HourlyForecast';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeather } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './MainPage.module.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const {loading, error, displayedWeather, city} = useAppSelector(state => state.weather)
    useEffect(() => {
        dispatch(fetchWeather(city))
    }, [city])
    return (
        <main className={style.main}>
            {loading && <h1>Is loading...</h1>}
            {error && <h1>{error}</h1>}
            {Object.keys(displayedWeather).length !== 0 
            ?<>
            <CurrentWeather />
            <ForecastFor3Days />
            <HourlyForecast />
            </> :null}
        </main>
    );
};

export default MainPage;