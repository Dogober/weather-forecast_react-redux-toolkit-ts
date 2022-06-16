import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectedDayOfForecast } from '../store/reducers/WeatherSlice/ActionCreators';
import DailyForecast from './DailyForecast';
import style from './styles/ForecastFor3Days.module.scss'

const ForecastFor3Days: FC = () => {
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const dispatch = useAppDispatch()
    return (
        <section className={style.forecastFor3Days}>
            {forecast?.forecastdays?.map(day =>
                <div 
                    key={day.date} 
                    className={
                        day.date === forecast?.dayOfForecast
                        ?style.forecastFor3Days__selected
                        :style.forecastFor3Days__dailyForecast
                    }
                    onClick={() => dispatch(selectedDayOfForecast(day.date))}
                >
                    <>
                        <DailyForecast {...day}/>
                    </>
                </div>
            )}
        </section>      
    );
};

export default ForecastFor3Days;
