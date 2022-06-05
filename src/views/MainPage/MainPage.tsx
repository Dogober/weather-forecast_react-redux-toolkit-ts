import { FC, useEffect } from 'react';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastFor3Days from '../../components/ForecastFor3Days';
import { useAppDispatch } from '../../hooks';
import { fetchWeather } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './MainPage.module.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchWeather())
    }, [])
    return (
        <main className={style.main}>
            <CurrentWeather />
            <ForecastFor3Days />
            <section className={style.main__weatherDetail}>
            </section>
        </main>
    );
};

export default MainPage;