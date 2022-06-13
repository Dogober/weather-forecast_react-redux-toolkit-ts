import { FC } from 'react';
import { useAppSelector } from '../hooks';
import { convertDate } from '../utils/constans/convertDate';
import style from './styles/ForecastFor3Days.module.scss'

interface DailyForecastProps {
     date?: string;
     day?: DayProps
}
interface DayProps {
    condition?: ConditionProps
    maxtemp?: string;
    mintemp?: string
}
interface ConditionProps {
    icon?: string;
    text?: string
}
const selectedItem = style.forecastFor3Days__selected__item
const dailyForecastItem = style.forecastFor3Days__dailyForecast__item

const DailyForecast: FC<DailyForecastProps> = ({date, day}) => {
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    return (
        <>
            <div className={style.forecastFor3Days__dailyForecast__day}>
                {convertDate(date!)}
            </div>
            <img src={day?.condition?.icon} className={style.forecastFor3Days__dailyForecast__img}/>
            <div className={dailyForecastItem}>
                {day?.maxtemp}
            </div>
            <div className={dailyForecastItem}>
                {day?.mintemp}
            </div>
            <div className={date === forecast?.dayOfForecast ?selectedItem :dailyForecastItem}>
                {date === forecast?.dayOfForecast ?day?.condition?.text :null}
            </div>
        </> 
    );
};

export default DailyForecast;