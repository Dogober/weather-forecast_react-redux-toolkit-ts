import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { weatherSlice } from '../store/reducers/WeatherSlice/WeatherSlice';
import DailyForecast from './DailyForecast';
import style from './styles/ForecastFor3Days.module.scss'

const ForecastFor3Days: FC = () => {
    const {displayedWeather, dayOfForecast} = useAppSelector(state => state.weather)
    const {selectedDayOfForecast} = weatherSlice.actions
    const dispatch = useAppDispatch()
    const {forecast} = displayedWeather
    return (
        <section className={style.forecastFor3Days}>
            {forecast?.forecastdays?.map(day =>
                <div 
                    key={day.date} 
                    className={
                        day.date === dayOfForecast 
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
