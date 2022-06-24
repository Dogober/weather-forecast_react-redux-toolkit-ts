import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks';
import { currentTempChart } from '../utils/constans/currentTempChart';
import { drawTempChart } from '../utils/constans/drawTempChart';
import HourlyForecast from './HourlyForecast';
import style from './styles/ForecastDetails.module.scss'
import ForecastDetailsLink from './ui/ForecastDetailsLink';

const ForecastDetails: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {isCel, forecastDetails} = useAppSelector(state => state.weather)
    useEffect(() => {
        drawTempChart(forecastDetails, forecast, canvasRef)
    }, [isCel, forecastDetails])
    return (
        <div className={style.forecastDetails}>
            <div className={style.forecastDetails__nav}>
                <ForecastDetailsLink currentDetails={'summary'} detailName={'Summary'}/>
                <ForecastDetailsLink currentDetails={'hourly'} detailName={'Hourly'}/>
            </div>
            { forecastDetails === 'summary'
            ?<div className={style.forecastDetails__canvasContainer}>
                <canvas width={(window.innerWidth - 50) * forecast?.forecastdays?.length!}
                    style={{
                        transform: `translateX(-${currentTempChart(forecast)}px)`,
                        transition: '1s'
                    }}
                    ref={canvasRef}
                >
                </canvas>
            </div>
            :<HourlyForecast/>}
        </div>
    );
};

export default ForecastDetails;