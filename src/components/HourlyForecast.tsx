import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks';
import { currentTempChart } from '../utils/constans/currentTempChart';
import { drawTempChart } from '../utils/constans/drawTempChart';
import style from './styles/HourlyForecast.module.scss'
import ForecastDetailsButton from './ui/ForecastDetailsButton';

const HourlyForecast: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {isCel, forecastDetails} = useAppSelector(state => state.weather)
    useEffect(() => {
        drawTempChart(forecastDetails, forecast, canvasRef)
    }, [isCel, forecastDetails])
    return (
        <div className={style.hourlyForecast}>
            <div className={style.hourlyForecast__nav}>
                <ForecastDetailsButton currentDetails={'summary'} detailName={'Summary'}/>
                <ForecastDetailsButton currentDetails={'hourly'} detailName={'Hourly'}/>
            </div>
            { forecastDetails === 'summary'
            ?<div className={style.hourlyForecast__canvasContainer}>
                <canvas
                    style={{
                        transform: `translateX(-${currentTempChart(forecast)}px)`,
                        transition: '1s'
                    }}
                    ref={canvasRef}
                >
                </canvas>
            </div>
            :<div className={style.hourlyForecast__hourly}>
                Hourly forecast
            </div>}
        </div>
    );
};

export default HourlyForecast;