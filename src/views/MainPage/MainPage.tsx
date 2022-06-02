import { FC } from 'react';
import CurrentWeather from '../../components/CurrentWeather';
import ForecastFor3Days from '../../components/ForecastFor3Days';
import style from './MainPage.module.scss'

const MainPage: FC = () => {
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