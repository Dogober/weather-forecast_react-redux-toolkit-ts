import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/ForecastFor3Days.module.scss'

interface DailyForecastProps {
     date: string;
     day: DayProps
}
interface DayProps {
    condition: ConditionProps
    maxtemp_c: number;
    mintemp_c: number
}
interface ConditionProps {
    icon: string;
    text: string
}
const selectedItem = style.forecastFor3Days__selected__item
const dailyForecastItem = style.forecastFor3Days__dailyForecast__item

const DailyForecast: FC<DailyForecastProps> = ({date, day}) => {
    const {displayedDate, dayOfForecast} = useAppSelector(state => state.weather)
    return (
        <>
            <div className={style.forecastFor3Days__dailyForecast__day}>
                {displayedDate?.find(el => el.date === date)?.convertDate}
            </div>
            <img src={day.condition.icon} className={style.forecastFor3Days__dailyForecast__img}/>
            <div className={dailyForecastItem}>
                {day.maxtemp_c} °C
            </div>
            <div className={dailyForecastItem}>
                {day.mintemp_c} °C
            </div>
            <div className={date === dayOfForecast ?selectedItem :dailyForecastItem}>
                {date === dayOfForecast ?day.condition.text :null}
            </div>
        </>
    );
};

export default DailyForecast;