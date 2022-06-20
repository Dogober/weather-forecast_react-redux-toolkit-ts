import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectedForecastDetails } from '../store/reducers/WeatherSlice/ActionCreators';
import { currentTempChart } from '../utils/constans/currentTempChart';
import { drawTempChart } from '../utils/constans/drawTempChart';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {isCel, forecastDetails} = useAppSelector(state => state.weather)
    const dispatch = useAppDispatch()
    useEffect(() => {
        drawTempChart(forecastDetails, forecast, canvasRef)
    }, [isCel, forecastDetails])
    return (
        <div className={style.hourlyForecast}>
            <div className={style.hourlyForecast__nav}>
                <button 
                    className={forecastDetails === 'summary'
                        ?style.hourlyForecast__linkActive 
                        :style.hourlyForecast__link
                    }
                    onClick={() => dispatch(selectedForecastDetails('summary'))}
                >
                    Summary
                </button>
                <button
                    className={forecastDetails === 'hourly'
                        ?style.hourlyForecast__linkActive 
                        :style.hourlyForecast__link
                    }
                    onClick={() => dispatch(selectedForecastDetails('hourly'))}
                >
                    Hourly
                </button>
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