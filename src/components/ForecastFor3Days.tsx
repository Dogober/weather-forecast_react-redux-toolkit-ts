import { FC, useState } from 'react';
import style from './styles/ForecastFor3Days.module.scss'

const days = ["Today", "Tomorrow", "Day after tomorrow"]
const ForecastFor3Days: FC = () => {
    const [selectedDay, setSelectedDay] = useState("Today")
    return (
        <section className={style.forecastFor3Days}>
            {days.map(day =>
                <button 
                    key={day} 
                    className={
                        day === selectedDay 
                        ?style.forecastFor3Days__dailyForecast_selected 
                        :style.forecastFor3Days__dailyForecast
                    }
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </button>
            )}
        </section>
    );
};

export default ForecastFor3Days;