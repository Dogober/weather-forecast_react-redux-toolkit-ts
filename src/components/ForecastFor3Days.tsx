import { FC, useState } from 'react';
import style from '../views/MainPage/MainPage.module.scss'

const days = ["Today", "Tomorrow", "Day after tomorrow"]
const ForecastFor3Days: FC = () => {
    const [selectedDay, setSelectedDay] = useState("Today")
    return (
        <section className={style.main__forecastFor3Days}>
            {days.map(day =>
                <button 
                    key={day} 
                    className={day === selectedDay ?style.main__dailyForecast_selected :style.main__dailyForecast}
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </button>
            )}
        </section>
    );
};

export default ForecastFor3Days;