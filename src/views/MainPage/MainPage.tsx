import { FC, useEffect } from 'react';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastFor3Days from '../../components/ForecastFor3Days';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeather } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './MainPage.module.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const {loading, error, weather} = useAppSelector(state => state.weather)
    useEffect(() => {
        dispatch(fetchWeather())
    }, [])
    return (
        <main className={style.main}>
            {loading && <h1>Is loading...</h1>}
            {error && <h1>{error}</h1>}
            {Object.keys(weather).length !== 0 
            ?<>
            <CurrentWeather />
            <ForecastFor3Days />
            <section className={style.main__weatherDetail}>
            </section>
            </> :null}
        </main>
    );
};

export default MainPage;